import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Subtotal from "./Subtotal";

export default function CarrinhoCompras() {
  return (
    <Card className="h-full flex flex-col overflow-y-auto bg-background p-4 rounded-lg border">
      <CardHeader>
        <CardTitle className="text-foreground text-xl">Carrinho de Compras</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 p-0 overflow-y-auto">
        {/* Barra de pesquisa (opcional) */}
        {/* Lista de produtos com scroll local */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Preço Unitário</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Exemplo de dados mock */}
              {Array.from({ length: 30 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>Produto {i + 1}</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>R$ 10,00</TableCell>
                  <TableCell>R$ 10,00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Subtotal fixo no final do card */}
        <div className="border-t px-6 py-4 bg-background">
          <Subtotal subtotal={300} />
        </div>
      </CardContent>
    </Card>
  );
};
