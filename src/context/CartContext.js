import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

// Acciones posibles para actualizar el carrito
const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return [...state, action.payload];

    case actionTypes.REMOVE_FROM_CART:
      return state.filter((_, index) => index !== action.payload);

    case actionTypes.UPDATE_QUANTITY:
      return state.map((item, index) =>
        index === action.payload.index
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart && storedCart.length > 0) {
      // Comprueba si storedCart tiene elementos
      storedCart.map((item) => {
        dispatch({ type: actionTypes.ADD_TO_CART, payload: item });
      });
    }
  }, []);

  useEffect(() => {
    // Almacenar el carrito en localStorage cada vez que cambie
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    dispatch({ type: actionTypes.ADD_TO_CART, payload: item });
  };

  const removeFromCart = (index) => {
    dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: index });
  };

  const updateQuantity = (index, quantity) => {
    dispatch({
      type: actionTypes.UPDATE_QUANTITY,
      payload: { index, quantity },
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
