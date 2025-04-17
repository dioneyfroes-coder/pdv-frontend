export default function Subtotal({ subtotal }: { subtotal: number }) {
    return (
        <div className="flex flex-col items-end justify-end w-full h-full p-4 bg-white border-t border-zinc-200">
            <div className="w-full text-right text-2xl font-bold text-zinc-800">
                {subtotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
            </div>
            <div className="text-sm text-zinc-500">Subtotal</div>
        </div>
    );
};