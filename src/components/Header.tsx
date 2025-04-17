import { LeitorCodigoBarras } from "./LeitorCodigoBarras";
import { Separator } from "./ui/separator";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">PDV - Caixa</h1>
        <LeitorCodigoBarras />
        <div className="text-sm text-muted-foreground">Operador: Fulano</div>
      </div>
      <Separator />
    </header>
  );
}
