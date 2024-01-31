import React from "react";
import Image from "next/image";
import Link from "next/link";

import Layout from "@layout/MainLayout";

const NotFoundPage = () => {
  return (
    <Layout pageName={"Página no encontrada | Lunal's Fashion Design"}>
      <div className="flex h-screen flex-col items-center justify-center">
        <Link href="/">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-4xl font-bold">Página no encontrada</h1>
            <p className="text-gray-600">
              Lo sentimos, la página que estás buscando no existe.
            </p>
            <p className="my-3 text-gray-600">
              <span>Haz click para ir a la </span>
              <span className="text-blue-500">
                página principal de Lunal&apos;s Fashion Design
              </span>
              <span>.</span>
            </p>
            <figure>
              <Image
                src="https://t3.ftcdn.net/jpg/02/61/08/76/360_F_261087622_8eRI0TAwDAyabS1b0Uifx1wKqHzA41r3.jpg"
                width={360}
                height={360}
                className="w-100"
                quality={100}
                alt="404 kitty"
                title="Página principal"
              />
            </figure>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
