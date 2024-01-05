import React, { useState, useEffect } from "react";
import { getSizes } from "@services/SizesServices";
import { getColors } from "@services/ColorsService";
import { useCart } from "@context/CartContext";
import Image from "next/image";
import Link from "next/link";

const BuyAction = ({ product }) => {
  const [sizes, setSizes] = useState([]);
  const [colours, setColours] = useState([]);
  const [hoveredSize, setHoveredSize] = useState(null);
  const [hoveredColour, setHoveredColour] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColour, setSelectedColour] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [buttonHovered, setButtonHovered] = useState(false);
  const { addToCart } = useCart();
  const sizesPerDefault = ["XS", "S", "M", "L"];

  useEffect(() => {
    const fetchSizesAndColours = async () => {
      try {
        const sizes0 = getSizes();
        const colours0 = getColors();
        setSizes(sizes0);
        setColours(colours0);
      } catch (error) {
        throw error;
      }
    };

    fetchSizesAndColours();
  }, []);

  // Función para determinar el estilo de las tallas
  const getSizeStyle = (size) => {
    const isAvailable = sizesPerDefault.includes(size.name);
    const isHovered = hoveredSize === size.id;
    const isSelected = selectedSize === size.id;
    return isAvailable
      ? `border ${
          isSelected
            ? "border-white"
            : isHovered
            ? "border-gray-300"
            : "border-transparent"
        } bg-black text-white`
      : "bg-white text-gray-500";
  };

  // Función para determinar el estilo de los colores
  const getColourStyle = (colour) => {
    const isHovered = hoveredColour === colour.id;
    const isSelected = selectedColour === colour.id;
    return {
      border: `2px solid ${
        isSelected ? "black" : isHovered ? "#ccc" : "transparent"
      }`,
      backgroundColor: colour.hexCode,
      color: isSelected ? "#000" : "#fff",
    };
  };

  // Manejar el hover en talla
  const handleSizeHover = (size) => {
    setHoveredSize(size.id);
  };

  // Manejar la salida del hover en talla
  const handleSizeHoverOut = () => {
    setHoveredSize(null);
  };

  // Manejar el hover en color
  const handleColourHover = (colour) => {
    setHoveredColour(colour.id);
  };

  // Manejar la salida del hover en color
  const handleColourHoverOut = () => {
    setHoveredColour(null);
  };

  // Manejar clic en talla
  const handleSizeClick = (size) => {
    setSelectedSize(size.id);
  };

  // Manejar clic en color
  const handleColourClick = (colour) => {
    setSelectedColour(colour.id);
  };

  // Manejo de cambios en la lista numérica de cantidad
  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    // Verificar que se haya seleccionado talla, color y cantidad
    if (selectedSize && selectedColour && selectedQuantity > 0) {
      // Actualizar el carrito en el contexto
      addToCart({
        product: product,
        size: sizes[selectedSize - 1],
        colour: colours[selectedColour - 1],
        quantity: selectedQuantity,
      });

      // Restablecer los estados después de agregar al carrito
      setSelectedSize(null);
      setSelectedColour(null);
      setSelectedQuantity(1);
    } else {
      // Mostrar un mensaje de error o realizar alguna acción
      alert("Por favor, seleccione talla, color y cantidad.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Filas de cuadritos para colores y tallas */}
      <div className="mb-4 flex">
        <div className="mr-2 flex">
          <p className="mr-2 -rotate-45 transform text-right italic">Color</p>
          {colours.map((colour) => (
            <div
              key={colour.id}
              className="mr-2 h-6 w-6 cursor-pointer border border-gray-300"
              style={getColourStyle(colour)}
              onMouseOver={() => handleColourHover(colour)}
              onMouseOut={() => handleColourHoverOut()}
              onClick={() => handleColourClick(colour)}
            />
          ))}
        </div>
        <div className="flex">
          <p className="mr-2 -rotate-45 transform text-right italic">Talla</p>
          {sizes.map((size, index) => (
            <div
              key={size.id}
              className={`h-6 w-6 border ${getSizeStyle(
                size,
              )} mr-2 flex cursor-pointer items-center justify-center`}
              onMouseOver={() => handleSizeHover(size)}
              onMouseOut={() => handleSizeHoverOut()}
              onClick={() => handleSizeClick(size)}
            >
              {size.name}
            </div>
          ))}
        </div>
      </div>

      {/* Guía de tallas */}
      <div className="flex items-center">
        <div className="h-6 w-6 -rotate-90 transform border border-gray-300"></div>
        <Link href="/guia-de-tallas" className="ml-1 text-gray-500 underline">
          Guía de tallas
        </Link>
      </div>

      {/* Precio del producto */}
      <p className="mt-4 text-lg font-bold">{`$${product.price.toFixed(2)}`}</p>

      {/* Lista numérica de cantidad */}
      <div className="mt-4 flex items-center space-x-2">
        <p className="mr-2 font-bold">Cantidad</p>
        <select
          className="cursor-pointer border border-gray-300 p-1 transition duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={handleQuantityChange}
          value={selectedQuantity}
        >
          {[...Array(9).keys()].map((number) => (
            <option
              key={number + 1}
              value={number + 1}
              className={`bg-white text-gray-500 hover:bg-gray-100 `}
            >
              {number + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Botón "ADICIONAR AL CARRITO" */}
      <button
        className={`mt-4 px-4 py-2 text-white ${
          buttonHovered ? "bg-red-600" : "bg-red-500"
        } transition duration-300 ease-in-out`}
        onMouseOver={() => setButtonHovered(true)}
        onMouseOut={() => setButtonHovered(false)}
        onClick={handleAddToCart}
      >
        ADICIONAR AL CARRITO
      </button>
    </div>
  );
};

export default BuyAction;
