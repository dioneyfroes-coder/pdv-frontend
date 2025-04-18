import { useEffect, useRef, useState, useCallback } from "react";
import { Camera } from "lucide-react";
import Webcam from "react-webcam";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";

interface CameraLeitorProps {
  dispositivos: MediaDeviceInfo[];
  dispositivoAtual: string;
  onLeitura: (codigo: string) => void;
  onClose: () => void;
  onDeviceChange: (deviceId: string) => void;
}

export function CameraLeitor({
  dispositivos,
  dispositivoAtual,
  onLeitura,
  onClose,
  onDeviceChange
}: CameraLeitorProps) {
  const webcamRef = useRef<Webcam>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const controlsRef = useRef<IScannerControls | null>(null);
  const [status, setStatus] = useState<'procurando' | 'encontrado'>('procurando');
  const lastScannedCode = useRef<string>('');
  const lastScanTime = useRef<number>(0);
  const errorCount = useRef<number>(0);
  const isMounted = useRef(true);

  const handleScanResult = useCallback((result: any, error: any) => {
    if (!isMounted.current) return;

    const now = Date.now();
    
    if (result && now - lastScanTime.current > 1000) {
      const code = result.getText();
      if (code !== lastScannedCode.current) {
        setStatus('encontrado');
        lastScannedCode.current = code;
        lastScanTime.current = now;
        errorCount.current = 0;
        onLeitura(code);
        
        setTimeout(() => isMounted.current && setStatus('procurando'), 1000);
      }
      return;
    }
    
    if (error) {
      if (errorCount.current < 3) {
        console.warn("Erro na leitura:", error.message || error);
      }
      errorCount.current++;
      
      if (errorCount.current > 10) {
        console.warn("Muitos erros consecutivos - reiniciando scanner...");
        restartScanner();
        errorCount.current = 0;
      }
    }
  }, [onLeitura]);

  const startScanner = useCallback(async () => {
    if (!isMounted.current || !webcamRef.current?.video) return;

    try {
      const controls = await codeReader.current.decodeFromVideoElement(
        webcamRef.current.video,
        handleScanResult
      );
      if (isMounted.current) {
        controlsRef.current = controls;
      } else {
        controls.stop();
      }
    } catch (error) {
      console.error("Erro ao iniciar scanner:", error);
    }
  }, [handleScanResult]);

  const restartScanner = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    }
    startScanner();
  }, [startScanner]);

  useEffect(() => {
    isMounted.current = true;
    startScanner();

    return () => {
      isMounted.current = false;
      if (controlsRef.current) {
        controlsRef.current.stop();
        controlsRef.current = null;
      }
    };
  }, [dispositivoAtual, startScanner]);

  const handleClose = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    }
    onClose();
  }, [onClose]);

  return (
    <div className="relative w-full max-w-md aspect-video border rounded-lg overflow-hidden bg-black">
      <Webcam
        ref={webcamRef}
        audio={false}
        videoConstraints={{
          deviceId: dispositivoAtual,
          facingMode: "environment"
        }}
        className="w-full h-full object-cover"
        onUserMediaError={(error) => {
          console.error("Erro na câmera:", error);
          handleClose();
        }}
      />
      
      <div className={`absolute inset-0 flex items-center justify-center transition-colors ${
        status === 'encontrado' ? 'bg-green-500/20' : ''
      }`}>
        <div className={`border-2 border-dashed rounded-lg w-64 h-32 ${
          status === 'encontrado' ? 'border-green-500' : 'border-yellow-500 animate-pulse'
        }`}></div>
      </div>
      
      {dispositivos.length > 1 && (
        <select
          value={dispositivoAtual}
          onChange={(e) => onDeviceChange(e.target.value)}
          className="absolute bottom-2 left-2 bg-background/80 text-foreground p-1 rounded text-sm"
        >
          {dispositivos.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Câmera ${device.deviceId.slice(0, 5)}`}
            </option>
          ))}
        </select>
      )}
      
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 bg-background/80 p-2 rounded-full hover:bg-background"
        aria-label="Fechar câmera"
      >
        <Camera className="w-5 h-5" />
      </button>
    </div>
  );
};