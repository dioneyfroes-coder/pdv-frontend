import { Toaster } from "sonner";
import Header from "./components/Header.js";
import Footer from "./components/Footer";
import CarrinhoCompras from "./components/CarrinhoCompras.js";
import AtalhosRapidos from "./components/AtalhosRapidos.js";

export default function PDVLayout() {
  return (
      <div className="flex flex-col h-screen">
        <Header />
        
        <main className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-hidden border-t border-muted">
          {/* Lado esquerdo: Carrinho */}
          <section className="h-full overflow-hidden bg-background border rounded-lg">
            <CarrinhoCompras />
          </section>

          {/* Lado direito: Atalhos */}
          <aside className="h-full overflow-hidden flex flex-col gap-4">
            <AtalhosRapidos />
          </aside>
        </main>

        <Footer />
        <Toaster />
      </div>
  );
};
