import React, { useState, useEffect } from "react";
import { getGenders } from "@services/GenderService";
import { getCategories } from "@services/CategoriesService";
import { getProducts } from "@services/ProductsService";
import { getPhotos } from "@services/PhotosService";
import Layout from "@layout/MainLayout";
import Card from "@components/ProductCard/ProductCard";

const CategoryPage = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [genders, setGenders] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [cardStatus, setCardStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await getProducts(category.id);
        setProducts(productsResponse);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [category.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gendersResponse = await getGenders();

        let genderResponses = [];
        let photoResponses = [];

        for (const product of products) {
          const gender = gendersResponse.find(
            (gen) => gen.id === product.category.genderId,
          );
          genderResponses.push(gender);

          const photo = await getPhotos(product.id);
          photoResponses.push(photo);
        }

        setGenders(genderResponses);
        setPhotos(photoResponses);
      } catch (error) {
        console.error("Error fetching genders and photos:", error);
      }
    };

    fetchData();
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      if (photos.length > 0) {
        setTimeout(() => setCardStatus(true), 250);
      }
    };

    fetchData();
  }, [photos]);

  return (
    <Layout>
      <div class="my-12 flex flex-col">
        <h1 class="font-inter py-3 pl-6 text-left text-xl font-normal leading-normal text-black sm:text-2xl">
          {category.name}
        </h1>
        <p class="font-inter pb-3 pl-6 text-left text-sm font-normal leading-normal text-black md:text-base xl:text-base">
          Resultados: {products.length}{" "}
          {products.length == 1 ? "producto" : "productos"}
        </p>
        <div class="flex flex-col items-center py-12 md:grid md:grid-cols-2 md:pl-12 lg:grid-cols-3">
          {cardStatus &&
            products.map((product, index) => (
              <Card
                photo1={photos[index][0]}
                photo2={photos[index][1]}
                gender={genders[index]}
                sizes={[{ name: "XS" }, { name: "S" }]}
                product={product}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { category } = params;
  const categoryData0 = await getCategories(1);
  const categoryData = categoryData0.find((cat) => cat.id === category * 1);

  return {
    props: {
      category: categoryData,
    },
  };
}

export default CategoryPage;
