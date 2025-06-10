"use client";

import { useCart } from "@/store/cart";
import { Button } from "../ui/button";

export const CartEmpty = () => {
  const { setOpen } = useCart();

  return (
    <div className="text-center flex flex-col gap-4">
      <p className="my-4">Carrinhos vazio.</p>
      <Button onClick={() => setOpen(false)}>Fechar</Button>
    </div>
  );
};
