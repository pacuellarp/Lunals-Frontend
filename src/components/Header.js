import logo from "/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCategories } from "@services/categoriesService";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [animateCategories, setAnimateCategories] = useState(false);

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
  }, []);

  return (
    <header class="body-font mt-5 flex w-full flex-col border-t border-gray-100 bg-white pl-0 text-gray-700 shadow-sm">
      <div class="container mx-auto flex items-center justify-between  p-6 font-bold md:flex-row">
        <Link
          class="lg:w-1/14 xl:w-1/14 md:w-1/14 h-auto w-12"
          href={{
            pathname: "/",
          }}
        >
          <Image
            src={logo}
            width={470}
            height={627}
            alt="Logo"
            quality={100}
            priority={true}
            class="object-cover"
          />
        </Link>
        <ul
          class={`${
            animateCategories ? "animate-fadeIn" : "" // Aplica la clase de animación si animateCategories es true
          } hidden flex-wrap items-center justify-around pl-24 text-base font-bold md:ml-auto md:mr-auto md:flex `}
        >
          {categories.map((category) => (
            <li
              class="lg:text-md mr-5 text-sm font-semibold hover:font-bold  hover:text-gray-900 md:opacity-100 xl:text-lg"
              key={category.id}
            >
              {category.name}{" "}
            </li>
          ))}
        </ul>
        <figure class="lg:w-1/10 xl:w-1/10 md:w-1/10 flex h-auto w-8 flex-row justify-around space-x-4 sm:justify-start">
          <Image
            src="https://img.icons8.com/?size=256&id=132&format=png"
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-10"
            alt="Search"
            quality={100}
          />
          <Image
            src="https://img.icons8.com/?size=256&id=9671&format=png"
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-10"
            quality={100}
            alt="Cart"
          />
        </figure>
      </div>
      <div class="container mx-auto flex items-center justify-center p-6  font-bold md:hidden md:flex-row">
        <ul
          class={`${
            animateCategories ? "animate-fadeIn" : "" // Aplica la clase de animación si animateCategories es true
          } flex  flex-row items-center justify-center text-base font-bold  md:translate-y-0`}
        >
          {categories.map((category) => (
            <li
              class="mr-5 text-sm font-semibold hover:font-bold hover:text-gray-900 md:text-base lg:text-lg xl:text-xl "
              key={category.id}
            >
              {category.name}{" "}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
