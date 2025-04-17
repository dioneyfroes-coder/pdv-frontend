import { Button } from "@/components/ui/button"
import { SearchIcon, CheckIcon, XIcon, Trash2Icon, HelpCircleIcon } from "lucide-react"
import { useEffect } from "react"
import { JSX } from "react/jsx-runtime"

interface Atalho {
  id: string
  label: string
  icon: JSX.Element
  tecla: string
  onClick: () => void
}

const atalhos: Atalho[] = [
  {
    id: "buscar-produto",
    label: "Buscar por nome",
    icon: <SearchIcon className="w-6 h-6" />,
    tecla: "F2",
    onClick: () => console.log("Buscar por nome"),
  },
  {
    id: "finalizar",
    label: "Finalizar Venda",
    icon: <CheckIcon className="w-6 h-6" />,
    tecla: "F3",
    onClick: () => console.log("Finalizar Venda"),
  },
  {
    id: "cancelar-item",
    label: "Cancelar Item",
    icon: <Trash2Icon className="w-6 h-6" />,
    tecla: "F4",
    onClick: () => console.log("Cancelar Item"),
  },
  {
    id: "cancelar-venda",
    label: "Cancelar Venda",
    icon: <XIcon className="w-6 h-6" />,
    tecla: "F5",
    onClick: () => console.log("Cancelar Venda"),
  },
  {
    id: "ajuda",
    label: "Ajuda",
    icon: <HelpCircleIcon className="w-6 h-6" />,
    tecla: "F6",
    onClick: () => console.log("Abrir ajuda"),
  }
  
];

export default function AtalhosRapidos() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      atalhos.forEach((atalho) => {
        if (e.key.toLowerCase() === atalho.tecla.toLowerCase().replace("f", "f")) {
          atalho.onClick()
        }
      })
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="h-full overflow-y-auto bg-muted p-4 rounded-lg grid grid-cols-2 gap-4">
      {atalhos.map((atalho) => (
        <Button
          key={atalho.id}
          onClick={atalho.onClick}
          variant="secondary"
          size="lg"
          className="flex flex-col items-center justify-center h-28 text-sm p-4 shadow-md"
        >
          <div className="mb-2 text-primary">{atalho.icon}</div>
          <span className="font-bold">{atalho.label}</span>
          <span className="text-xs opacity-70">{atalho.tecla}</span>
        </Button>
      ))}
    </div>
  );
};
