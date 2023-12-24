import React, { useState } from "react";
import Image from "next/image";

export default function Card({ photo1, photo2, gender, sizes, product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <figure className="flex flex-col overflow-hidden">
        <Image
          src={isHovered ? photo1.link : photo2.link}
          width={768}
          height={1024}
          className=" lg:w-50 sm:w-30 w-72 object-cover transition-opacity duration-300 md:w-40 xl:w-60"
          alt={`Card product`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <figcaption>
          <p className="font-inter text-xs text-neutral-600">
            {gender.name}, {sizes.map((size) => size.name).join("-")}
          </p>
          <p className="font-inter text-base">{product.name}</p>
          <p className="font-inter text-base font-bold">$ {product.price}</p>
        </figcaption>
      </figure>
    </>
  );
}
