import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import Subtotal from "./Subtotal";
import { useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export default function CarrinhoCompras() {
  const [produtos, setProdutos] = useState<Produto[]>(
    Array.from({ length: 3 }).map((_, i) => ({
      id: i + 1,
      nome: `Produto ${i + 1}`,
      preco: 10.0,
      quantidade: 1,
    }))
  );

  const atualizarQuantidade = (id: number, novaQuantidade: number) => {
    if (novaQuantidade < 1) return;
    setProdutos(produtos.map(prod => 
      prod.id === id ? { ...prod, quantidade: novaQuantidade } : prod
    ));
  };

  const calcularSubtotal = () => {
    return produtos.reduce((total, prod) => total + (prod.preco * prod.quantidade), 0);
  };

  return (
    <Card className="h-full flex flex-col overflow-y-auto bg-background p-4 rounded-lg border">
      <CardHeader>
        <CardTitle className="text-foreground text-xl">Carrinho de Compras</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 p-0 overflow-y-auto">
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="w-32">Quantidade</TableHead>
                <TableHead>Preço Unitário</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => atualizarQuantidade(produto.id, produto.quantidade - 1)}
                        disabled={produto.quantidade <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{produto.quantidade}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => atualizarQuantidade(produto.id, produto.quantidade + 1)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>R$ {produto.preco.toFixed(2)}</TableCell>
                  <TableCell>R$ {(produto.preco * produto.quantidade).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="border-t px-6 py-4 bg-background">
          <Subtotal subtotal={calcularSubtotal()} />
        </div>
      </CardContent>
    </Card>
  );
};