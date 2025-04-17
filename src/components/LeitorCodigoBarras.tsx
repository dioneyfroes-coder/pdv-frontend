import { useEffect, useState } from "react";
import { Barcode } from "lucide-react";

export function LeitorCodigoBarras() {
  const [codigo, setCodigo] = useState("");
  const [ativo, setAtivo] = useState(false);

  const handleKeyPress = (event: KeyboardEvent) => {
    setAtivo(true);
    if (event.key === "Enter") {
      console.log("Código de barras lido:", codigo);
      setCodigo("");
      setAtivo(false);
    } else {
      setCodigo((prev) => prev + event.key);
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [codigo]);

  return (
    <div className="flex items-center gap-2 p-2 border rounded-lg bg-muted text-foreground w-full max-w-md">
      <Barcode className="w-6 h-6 text-primary" />
      <input
        type="text"
        value={codigo}
        placeholder="Aguardando leitura do código de barras..."
        className="bg-transparent outline-none flex-1 text-lg"
        readOnly
      />
      {ativo && (
        <span className="text-xs text-muted-foreground">Pressione Enter</span>
      )}
    </div>
  );
};
