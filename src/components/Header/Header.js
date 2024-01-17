import logo from "/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useContext, useRef } from "react";
import { getCategories } from "@services/CategoriesService";
import { HeaderContext } from "@context/HeaderContext";
import { useCart } from "@context/CartContext";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [animateCategories, setAnimateCategories] = useState(false);

  const { cartCount } = useCart();

  const { setHeaderHeight } = useContext(HeaderContext);
  const ref = useRef();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getCategories(1);
        setCategories(response);
        setAnimateCategories(true);
      } catch (error) {
        throw error;
      }
    }

    fetchCategories();
    const height = ref.current.offsetHeight;
    setHeaderHeight(height);
  }, [setHeaderHeight]);

  return (
    <header
      ref={ref}
      className="body-font mt-5 flex w-full flex-col border-t border-gray-100 bg-white pl-0 text-gray-700 shadow-sm"
    >
      <div className="container mx-auto flex items-center justify-between p-4 font-bold md:flex-row md:p-6">
        <Link
          className="lg:w-1/14 xl:w-1/14 md:w-1/14 h-auto w-10"
          href={{
            pathname: "/",
          }}
        >
          <Image
            src={logo}
            width={380} // Reduzco el ancho del logo
            height={502} // Reduzco la altura del logo
            alt="Logo"
            quality={100}
            priority={true}
            className="object-cover"
            title="Página principal"
          />
        </Link>
        <ul
          className={`${
            animateCategories ? "animate-fadeIn" : ""
          } hidden flex-wrap items-center justify-around pl-4 text-xs font-semibold md:ml-auto md:mr-auto md:flex md:pl-8 md:text-sm `}
        >
          {categories.map((category) => (
            <Link href={`/category/${category.id}`}>
              <li
                className="font-inter mr-3 text-xs hover:font-bold hover:text-gray-900 md:mr-5 md:opacity-100 lg:text-sm"
                key={category.id}
              >
                {category.name}
              </li>
            </Link>
          ))}
        </ul>
        <figure className="xl:w-1/10 flex h-auto w-3/12 flex-row justify-around space-x-2 md:w-2/12 md:justify-start lg:w-1/12">
          <Image
            src="https://img.icons8.com/?size=256&id=132&format=png"
            width="0"
            height="0"
            sizes="100vw"
            className="hidden h-auto w-6 md:w-8"
            alt="Search"
            quality={100}
          />
          <Link href="/cart">
            <figure className="flex">
              <Image
                src="https://img.icons8.com/?size=256&id=9671&format=png"
                width="0"
                height="0"
                sizes="100vw"
                className="h-auto w-6 md:w-8"
                quality={100}
                alt="Cart"
                title="Carrito de compras"
              />
              <div
                className={`${
                  cartCount > 0 ? "" : "hidden"
                }  right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white`}
              >
                {cartCount}
              </div>
            </figure>
          </Link>
        </figure>
      </div>
      <div className="container mx-auto flex items-center justify-center p-4 font-bold md:hidden md:flex-row md:p-6">
        <ul
          className={`${
            animateCategories ? "animate-fadeIn" : ""
          } flex flex-row items-center justify-center text-xs font-semibold md:translate-y-0 md:text-sm`}
        >
          {categories.map((category) => (
            <li
              className=" font-inter mr-3 text-xs hover:font-bold hover:text-gray-900 md:mr-5 md:text-sm lg:text-base xl:text-xl"
              key={category.id}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
