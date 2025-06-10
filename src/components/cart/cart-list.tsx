"use client";

import { decimalToMoney } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useProducts } from "@/store/products";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CartProduct } from "./cart-product";

export const CartList = () => {
  const cart = useCart();
  const products = useProducts();

  const [subTotal, setSubTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(10);

  const calculateSubtotal = () => {
    let sub = 0;

    for (const item of cart.items) {
      const product = products.products.find(
        (pitem) => pitem.id === item.productId
      );

      if (product) {
        sub += item.quantity * parseFloat(product.price.toString());
      }
    }
    setSubTotal(sub);
  };

  useEffect(() => {
    calculateSubtotal();
  }, [cart]);

  return (
    <>
      <div className="flex flex-col gap-4 py-5">
        {cart.items.map((item) => (
          <CartProduct key={item.productId} data={item} />
        ))}
      </div>
      <div className="py-4 text-right">
        <div>Sub-total: {decimalToMoney(subTotal)}</div>
        <div>Frete: {decimalToMoney(shippingCost)}</div>
        <div className="font-bold">
          Total: {decimalToMoney(subTotal + shippingCost)}
        </div>
      </div>
      <Button>Finalizar compra</Button>
    </>
  );
};
