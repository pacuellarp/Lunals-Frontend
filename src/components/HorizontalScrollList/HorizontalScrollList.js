import React, { useState, useEffect } from "react";
import ProductCard from "@components/ProductCard/ProductCard";
import { getAllProducts } from "@services/AllProductsService";
import { getGenders } from "@services/GenderService";
import { getPhotos } from "@services/PhotosService";
import Link from "next/link";

export default function HorizontalScrollList() {
  const [products, setProducts] = useState([]);
  const [genders, setGenders] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [cardStatus, setCardStatus] = useState(false);

  // **Revisión 1: Romper el ciclo de dependencias**

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getAllProducts();

        function generateRandomNumbers(limit) {
          const numbers = [];

          for (let i = 0; i < 6; i++) {
            numbers.push(Math.floor(Math.random() * limit) + 1);
          }

          return numbers;
        }

        const randomNumbers = generateRandomNumbers(productData.length);
        console.log(randomNumbers);
        const filteredProducts = productData.filter((item) =>
          randomNumbers.includes(item.id),
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // **Revisión 2: Fetch de datos de forma controlada**

  useEffect(() => {
    const fetchGendersAndPhotos = async () => {
      try {
        const gendersResponse = await getGenders();
        const photoPromises = products.map((product) => getPhotos(product.id));
        const photosResponses = await Promise.all(photoPromises);

        setGenders(gendersResponse);
        setPhotos(photosResponses);
      } catch (error) {
        console.error("Error fetching genders and photos:", error);
      }
    };

    fetchGendersAndPhotos();
  }, [products]);

  // **Revisión 3: Optimizar el fetch de fotos**

  useEffect(() => {
    if (photos.length > 0) {
      setTimeout(() => setCardStatus(true), 250);
    }
  }, [photos]);

  return (
    <div className="flex overflow-x-auto">
      {cardStatus &&
        products.map((product, index) => (
          <Link href={`/product/${product.id}`}>
            <ProductCard
              photo1={photos[index][0]}
              photo2={photos[index][1]}
              gender={genders[index]}
              sizes={[{ name: "XS" }, { name: "S" }]}
              product={product}
            />
          </Link>
        ))}
    </div>
  );
}
