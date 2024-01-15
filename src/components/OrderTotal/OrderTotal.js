import React, { useEffect, useState } from "react";
import { useCart } from "@context/CartContext";

export default function OrderTotal() {
  const { cart } = useCart();
  const [items, setItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let numItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setItems(numItems);
    let price = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    setTotalPrice(price);
  }, [cart]);

  return (
    <div className="my-6 mr-16 h-1/3 w-1/4 rounded-md bg-gray-200 p-4">
      <div className="mb-2 flex justify-between">
        <span>Elementos en la orden</span>
        <span>{`${items} item(s)`}</span>
      </div>
      <hr className="mb-2 border-t border-gray-300" />
      <div className="flex justify-between">
        <span>Precio total</span>
        <span>{`$ ${totalPrice.toLocaleString("es-ES", {
          style: "decimal",
        })}`}</span>
      </div>
      <hr className="mt-2 border-t border-gray-300" />
    </div>
  );
}
