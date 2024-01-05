import React, { useState } from "react";
import { useCart } from "@context/CartContext";

const ShoppingCart = () => {
  const [buttonHovered, setButtonHovered] = useState(false);
  const { cart, removeFromCart, updateQuantity } = useCart();

  const phoneNumber = "573188222645"; // Reemplaza con el número de teléfono deseado
  let defaultMessage = "¡Hola! Estoy interesado en ";

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const handleQuantityChange = (index, quantity) => {
    updateQuantity(index, quantity);
  };

  const handleConfirmPurchase = () => {
    cart.map((item, index) => {
      let text;
      text = `${
        item.quantity
      } ${item.product.name.toLowerCase()} color ${item.colour.name.toLowerCase()} talla ${
        item.size.name
      }`;

      if (index > 0 && index + 1 != cart.length) {
        text = `, ${
          item.quantity
        } ${item.product.name.toLowerCase()} color ${item.colour.name.toLowerCase()} talla ${
          item.size.name
        }`;
      } else if (index + 1 == cart.length) {
        text = ` y ${
          item.quantity
        } ${item.product.name.toLowerCase()} color ${item.colour.name.toLowerCase()} talla ${
          item.size.name
        }`;
      }

      defaultMessage = defaultMessage + text;
    });

    defaultMessage =
      defaultMessage + ". Espero tu respuesta lo más pronto posible. ";

    const encodedMessage = encodeURIComponent(defaultMessage);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

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
              <p>
                Cantidad:{" "}
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value))
                  }
                >
                  {[...Array(9).keys()].map((number) => (
                    <option key={number + 1} value={number + 1}>
                      {number + 1}
                    </option>
                  ))}
                </select>
              </p>
              <button onClick={() => handleRemove(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <button
        className={`mt-4 px-4 py-2 text-white ${
          buttonHovered ? "bg-green-500" : "bg-green-400"
        } transition duration-300 ease-in-out`}
        onMouseOver={() => setButtonHovered(true)}
        onMouseOut={() => setButtonHovered(false)}
        //onClick={handleAddToCart}
        onClick={handleConfirmPurchase}
      >
        CONTINUAR CON LA COMPRA
      </button>
    </div>
  );
};

export default ShoppingCart;
