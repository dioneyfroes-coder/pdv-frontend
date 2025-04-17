import { useKeyboardShortcut } from "../providers/keyboard-shortcut-provider";
import { toast } from "sonner";

export default function AtalhosPDV() {
  useKeyboardShortcut("f2", () => toast("🔍 Pesquisar por nome ativado"));
  useKeyboardShortcut("f10", () => toast("💳 Finalizar compra ativado"));
  useKeyboardShortcut("delete", () => toast("🗑️ Cancelar item ativado"));
  useKeyboardShortcut("escape", () => toast("❌ Cancelar venda ativado"));

  return null; // Este componente é só para escutar os atalhos, não renderiza nada
};
