import { useEffect, useState, useRef, useCallback } from "react";
import { Barcode, Camera } from "lucide-react";
import { CameraLeitor } from "./CameraLeitor";

interface LeitorCodigoBarrasProps {
  onLeituraCompleta?: (codigo: string) => void;
}

export function LeitorCodigoBarras({ onLeituraCompleta }: LeitorCodigoBarrasProps) {
  const [codigo, setCodigo] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [modoCamera, setModoCamera] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [dispositivos, setDispositivos] = useState<MediaDeviceInfo[]>([]);
  const [dispositivoAtual, setDispositivoAtual] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.altKey || event.metaKey || (event.key.length > 1 && event.key !== "Enter")) {
      return;
    }

    setAtivo(true);
    
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => {
      setAtivo(false);
      setCodigo("");
    }, 1000));

    if (event.key === "Enter") {
      processarCodigo(codigo);
    } else {
      setCodigo((prev) => prev + event.key);
    }
  };

  const processarCodigo = (codigoLido: string) => {
    if (codigoLido.length < 8 || codigoLido.length > 20) {
      console.error("Código inválido");
      setCodigo("");
      return;
    }
    
    onLeituraCompleta?.(codigoLido);
    console.log("Código de barras lido:", codigoLido);
    setCodigo("");
    setAtivo(false);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const alternarModoCamera = () => {
    setModoCamera(!modoCamera);
    if (!modoCamera && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const carregarDispositivos = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === "videoinput");
      setDispositivos(videoDevices);
      if (videoDevices.length > 0) {
        setDispositivoAtual(videoDevices[0].deviceId);
      }
    } catch (error) {
      console.error("Erro ao carregar dispositivos:", error);
      alert("Permissão para câmera negada ou dispositivo não encontrado");
    }
  }, []);

  useEffect(() => {
    if (modoCamera) {
      carregarDispositivos();
    }
  }, [modoCamera, carregarDispositivos]);

  useEffect(() => {
    if (!modoCamera) {
      const handler = (event: KeyboardEvent) => handleKeyPress(event);
      window.addEventListener("keypress", handler);
      return () => {
        window.removeEventListener("keypress", handler);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [modoCamera, codigo]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 p-2 border rounded-lg bg-muted text-foreground w-full max-w-md">
        <Barcode className="w-6 h-6 text-primary" />
        <input
          ref={inputRef}
          type="text"
          value={codigo}
          placeholder="Aguardando leitura do código de barras..."
          className="bg-transparent outline-none flex-1 text-lg"
          readOnly
        />
        <button
          onClick={alternarModoCamera}
          className={`p-1 rounded-full ${modoCamera ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
          aria-label={modoCamera ? "Desativar câmera" : "Ativar câmera"}
        >
          <Camera className="w-5 h-5" />
        </button>
        {ativo && !modoCamera && (
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Lendo código...</span>
          </div>
        )}
      </div>

      {modoCamera && dispositivoAtual && (
        <CameraLeitor
          dispositivos={dispositivos}
          dispositivoAtual={dispositivoAtual}
          onLeitura={processarCodigo}
          onClose={alternarModoCamera}
          onDeviceChange={setDispositivoAtual}
        />
      )}
    </div>
  );
};