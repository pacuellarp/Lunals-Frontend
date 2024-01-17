import React, { useEffect, useState } from "react";
import Image from "next/image";
import Banner from "@components/Banner/Banner";
import Modal from "@components/Modal/Modal";
import { useRouter } from "next/router";
import { getPhotos } from "@services/PhotosService";
import { useCart } from "@context/CartContext";

const ShoppingCart = () => {
  const [buttonHovered, setButtonHovered] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photosStatus, setPhotosStatus] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, emptyTheCart, cartCount } =
    useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cart.length > 0) {
          let photoResponses = [];

          for (const item of cart) {
            const photo = await getPhotos(item.product.id);
            photoResponses.push(photo);
          }
          setPhotos(photoResponses);
          setPhotosStatus(true);
        }
      } catch (error) {
        console.error("Error fetching genders and photos:", error);
      }
    };

    fetchData();
  }, [cart]);

  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const phoneNumber = "573185575555"; // Reemplaza con el número de teléfono deseado
  let defaultMessage = "¡Hola! Estoy interesado en ";

  const handleRemove = (index) => {
    removeFromCart(index);
    handleRemoveProduct();
  };

  const handleQuantityChange = (index, quantity) => {
    updateQuantity(index, quantity);
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

  const handleConfirmPurchase = () => {
    //Comparación si cart está sincronizado con el localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    const resultado = cartLocalStorageSynchrony(storedCart, cart);
    if (resultado) {
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
        } else if (index + 1 == cart.length && cart.length != 1) {
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

      alert("¡Continua en nuestro chat de WhatsApp!");
      emptyTheCart();
      router.push("/");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleRemoveProduct = () => {
    setIsBannerVisible(true);
    setTimeout(() => {
      setIsBannerVisible(false);
    }, 2300);
  };

  return (
    <div className="ml-16 flex w-1/3 flex-col py-3 pl-6 text-left">
      <h1 className="font-inter py-3 text-xl font-normal leading-normal text-black sm:text-2xl">
        Carrito de Compras
      </h1>
      {cart.length != 0 && photosStatus ? (
        <ul className="flex flex-col py-3">
          {cart.map((item, index) => (
            <li key={index} className="flex flex-col py-3">
              <div className="grid grid-flow-col justify-stretch">
                <figure className="flex justify-center">
                  <Image
                    src={photos[index][0].link}
                    width={768}
                    height={1024}
                    className=" w-1/3"
                    alt={`Image product`}
                  />
                </figure>
                <div>
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
                  <button
                    className="text-red-600	"
                    onClick={() => handleRemove(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-3">Tu carrito actualmente está vacío.</p>
      )}
      <button
        className={`${
          cartCount == 0 ? "" : "hidden"
        } mt-4 cursor-no-drop bg-gray-400
      px-4 py-2 text-white transition duration-300 ease-in-out`}
      >
        CONTINUAR CON LA COMPRA
      </button>
      <button
        className={`${
          cartCount == 0 ? "hidden" : ""
        } mt-4 px-4 py-2 text-white ${
          buttonHovered ? "bg-green-500" : "bg-green-400"
        } transition duration-300 ease-in-out`}
        onMouseOver={() => setButtonHovered(true)}
        onMouseOut={() => setButtonHovered(false)}
        //onClick={handleAddToCart}
        onClick={handleConfirmPurchase}
      >
        CONTINUAR CON LA COMPRA
      </button>
      <button
        className={`mt-4 border border-black bg-white px-4 py-2 text-black transition duration-300 ease-in-out hover:bg-gray-200`}
        onClick={handleGoBack}
      >
        SEGUIR COMPRANDO
      </button>
      {isBannerVisible && (
        <Banner
          message="Producto eliminado del carrito."
          buyingOrRemoving="removing"
        />
      )}
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

export default ShoppingCart;
