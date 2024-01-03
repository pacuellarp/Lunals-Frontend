import React from "react";
import { useCart } from "@context/CartContext";

const ShoppingCart = () => {
  const { cart } = useCart();

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <p>Producto: {item.product.name}</p>
              <p>Talla: {item.size.name}</p>
              <p>Color: {item.colour.name}</p>
              <p>Cantidad: {item.quantity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
