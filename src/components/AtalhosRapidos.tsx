import { Button } from "@/components/ui/button";
import { 
  SearchIcon, 
  CheckIcon, 
  XIcon, 
  Trash2Icon, 
  HelpCircleIcon,
  PercentIcon,
  PlusCircleIcon
} from "lucide-react";
import { JSX, useEffect, useState } from "react";

interface Atalho {
  id: string;
  label: string;
  icon: JSX.Element;
  tecla: string;
  onClick: () => void;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
}

export default function AtalhosRapidos() {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const atalhos: Atalho[] = [
    {
      id: "buscar-produto",
      label: "Buscar por nome",
      icon: <SearchIcon className="w-5 h-5" />,
      tecla: "F2",
      onClick: () => {
        setActiveButton("buscar-produto");
        setTimeout(() => setActiveButton(null), 200);
        console.log("Buscar por nome");
      },
      variant: "secondary"
    },
    {
      id: "desconto",
      label: "Desconto",
      icon: <PercentIcon className="w-5 h-5" />,
      tecla: "F3",
      onClick: () => {
        setActiveButton("desconto");
        setTimeout(() => setActiveButton(null), 200);
        console.log("Aplicar desconto");
      },
      variant: "outline"
    },
    {
      id: "acrescimo",
      label: "Acréscimo",
      icon: <PlusCircleIcon className="w-5 h-5" />,
      tecla: "F4",
      onClick: () => {
        setActiveButton("acrescimo");
        setTimeout(() => setActiveButton(null), 200);
        console.log("Aplicar acréscimo");
      },
      variant: "outline"
    },
    {
      id: "finalizar",
      label: "Finalizar Venda",
      icon: <CheckIcon className="w-5 h-5" />,
      tecla: "F6",
      onClick: () => {
        setActiveButton("finalizar");
        setTimeout(() => setActiveButton(null), 200);
        console.log("Finalizar Venda");
      },
      variant: "default"
    },
    {
      id: "cancelar-item",
      label: "Cancelar Item",
      icon: <Trash2Icon className="w-5 h-5" />,
      tecla: "F7",
      onClick: () => {
        setActiveButton("cancelar-item");
        setTimeout(() => setActiveButton(null), 200);
        console.log("Cancelar Item");
      },
      variant: "destructive"
    },
    {
      id: "cancelar-venda",
      label: "Cancelar Venda",
      icon: <XIcon className="w-5 h-5" />,
      tecla: "F8",
      onClick: () => {
        setActiveButton("cancelar-venda");
        setTimeout(() => setActiveButton(null), 200);
        console.log("Cancelar Venda");
      },
      variant: "destructive"
    },
    {
      id: "ajuda",
      label: "Ajuda",
      icon: <HelpCircleIcon className="w-5 h-5" />,
      tecla: "F9",
      onClick: () => {
        setActiveButton("ajuda");
        setTimeout(() => setActiveButton(null), 200);
        console.log("Abrir ajuda");
      },
      variant: "ghost"
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar combinações com Ctrl/Alt/Shift/Meta
      if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) return;
      
      // Ignorar se estiver em um input/textarea/select
      if ((e.target as HTMLElement).tagName.match(/INPUT|TEXTAREA|SELECT/)) return;
      
      atalhos.forEach((atalho) => {
        if (e.key === atalho.tecla) {
          e.preventDefault();
          atalho.onClick();
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-muted px-4 py-6 rounded-lg grid grid-cols-2 gap-4" 
         style={{ marginTop: '1rem' }}>
      {atalhos.map((atalho) => (
        <Button
          key={atalho.id}
          onClick={atalho.onClick}
          variant={atalho.variant || "secondary"}
          className={`flex flex-col items-center justify-center h-28 text-sm p-4 shadow-md transition-all ${
            activeButton === atalho.id ? "scale-95 ring-2 ring-primary" : ""
          }`}
        >
          <div className="mb-2 text-primary">{atalho.icon}</div>
          <span className="font-bold">{atalho.label}</span>
          <span className="text-xs opacity-70">{atalho.tecla}</span>
        </Button>
      ))}
    </div>
  );
};