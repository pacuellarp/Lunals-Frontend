import React, { useState, useEffect } from "react";
import Modal from "@components/Modal/Modal";
import { getSizes } from "@services/SizesServices";
import { getColors } from "@services/ColorsService";
import { useCart } from "@context/CartContext";
import Link from "next/link";

const BuyAction = ({ product, onBannerActivate }) => {
  const [sizes, setSizes] = useState([]);
  const [colours, setColours] = useState([]);
  const [hoveredSize, setHoveredSize] = useState(null);
  const [hoveredColour, setHoveredColour] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColour, setSelectedColour] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSizeObject, setSelectedSizeObject] = useState([]);
  const [selectedColourObject, setSelectedColourObject] = useState([]);
  const [statusColour, setStatusColour] = useState(false);
  const [statusSize, setStatusSize] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const { cart, addToCart } = useCart();
  const sizesPerDefault = ["XS", "S", "M", "L"];
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSizesAndColours = async () => {
      try {
        const sizes0 = getSizes();
        const colours0 = getColors();
        setSizes(sizes0);
        setColours(colours0);
      } catch (error) {
        console.error(error);
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
    let theSize;
    for (const element of sizes) {
      if (element.id == size.id) {
        theSize = element;
      }
    }

    setSelectedSizeObject(theSize);

    setStatusSize(true);
  };

  // Manejar clic en color
  const handleColourClick = (colour) => {
    setSelectedColour(colour.id);
    let theColour;
    for (const element of colours) {
      if (element.id == colour.id) {
        theColour = element;
      }
    }

    setSelectedColourObject(theColour);

    setStatusColour(true);
  };

  // Manejo de cambios en la lista numérica de cantidad
  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  //Función para ver si el estado cart está en sincronía con el localStorage, pra evitar productos fantasma en el carrito
  function cartLocalStorageSynchrony(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Clonar los arrays para evitar modificar los originales
    const copiaArr1 = JSON.parse(JSON.stringify(arr1));
    const copiaArr2 = JSON.parse(JSON.stringify(arr2));

    // Ordenar los arrays por sus propiedades antes de la comparación
    copiaArr1.sort((a, b) => JSON.stringify(a) - JSON.stringify(b));
    copiaArr2.sort((a, b) => JSON.stringify(a) - JSON.stringify(b));

    // Comparar cada elemento en las posiciones correspondientes
    return copiaArr1.every(
      (element, index) =>
        JSON.stringify(element) === JSON.stringify(copiaArr2[index]),
    );
  }

  const handleAddToCart = () => {
    //Comparación si cart está sincronizado con el localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    const resultado = cartLocalStorageSynchrony(storedCart, cart);
    if (resultado) {
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
        setStatusSize(false);
        setStatusColour(false);
        onBannerActivate();
      } else {
        // Mostrar un mensaje de error o realizar alguna acción
        alert("Por favor, selecciona talla y color.");
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Filas de cuadritos para colores y tallas */}
      <div className="mb-4 flex flex-col">
        <div className="mx-2 my-4 flex flex-col">
          <p className="mb-2 mr-2 transform text-left ">
            Color: {statusColour ? `${selectedColourObject.name}` : ""}
          </p>
          <div className="flex flex-row">
            {colours.map((colour) => (
              <div
                key={colour.id}
                className="mr-2 h-6 w-6 cursor-pointer border border-gray-300"
                style={getColourStyle(colour)}
                tabIndex={0}
                role="button" // Añadido para cumplir con la accesibilidad
                onMouseOver={() => handleColourHover(colour)}
                onMouseOut={() => handleColourHoverOut()}
                onFocus={() => handleColourHover(colour)}
                onBlur={() => handleColourHoverOut()}
                onClick={() => handleColourClick(colour)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleColourClick(colour);
                  }
                }}
              />
            ))}
          </div>
        </div>
        <div className="mx-2 mb-4 mt-2  flex flex-col">
          <p className="mb-2 mr-2 transform text-left ">
            Talla: {statusSize ? `${selectedSizeObject.name}` : ""}
          </p>
          <div className="flex flex-row">
            {sizes.map((size) => (
              <div
                key={size.id}
                className={`h-6 w-6 border ${getSizeStyle(
                  size,
                )} mr-2 flex cursor-pointer items-center justify-center`}
                tabIndex={0}
                role="button"
                onMouseOver={() => handleSizeHover(size)}
                onMouseOut={() => handleSizeHoverOut()}
                onFocus={() => handleSizeHover(size)}
                onBlur={() => handleSizeHoverOut()}
                onClick={() => handleSizeClick(size)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSizeClick(size);
                  }
                }}
              >
                {size.name}
              </div>
            ))}
          </div>
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
      <p className="mt-4 text-lg font-bold">{`$${product.price.toLocaleString(
        "es-ES",
        { style: "decimal" },
      )}`}</p>

      {/* Lista numérica de cantidad */}
      <div className="mt-4 flex items-center space-x-2">
        <p className="mr-2">Cantidad</p>
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
        onFocus={() => setButtonHovered(true)}
        onBlur={() => setButtonHovered(false)}
        onClick={handleAddToCart}
      >
        ADICIONAR AL CARRITO
      </button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          message="Error. Actualiza la pantalla."
          buttonText="Recargar página"
          onClickButton={() => {
            location.reload();
          }}
        />
      )}
    </div>
  );
};

export default BuyAction;
