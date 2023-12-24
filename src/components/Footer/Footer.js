import logo from "/public/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div class="flex min-h-screen w-full items-end bg-white">
      <footer class="body-font w-full bg-gray-100 text-gray-700">
        <div class="md:flex-no-wrap container mx-auto flex flex-col flex-wrap px-5 py-24 md:items-center lg:flex-row lg:items-start">
          <div class="mx-auto w-64 flex-shrink-0 justify-center text-center md:mx-0 md:justify-center lg:justify-start ">
            <a class="title-font flex items-center justify-center font-medium text-gray-900">
              <figure class="lg:w-1/14 xl:w-1/14 md:w-1/14 h-auto w-16">
                <Image
                  src={logo}
                  width={470}
                  height={627}
                  alt="Logo"
                  quality={100}
                  priority={true}
                  class="object-cover"
                />
              </figure>
            </a>
            <div class="mt-4">
              <span class="mt-2 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start">
                <a
                  href="https://www.facebook.com/lunalsfasiondesign/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/lunals_fashion_design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ml-3 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
              </span>
            </div>
          </div>
          <div class="-mb-10 mt-10 flex flex-grow flex-wrap text-center md:mt-0 md:pl-20 md:text-left lg:justify-end">
            <div class="w-full px-4 md:w-1/2 lg:w-1/4">
              <h2 class="title-font mb-3 text-sm font-medium uppercase tracking-widest text-gray-900">
                Acerca de
              </h2>
              <nav class="mb-10 list-none">
                <li class="mt-3">
                  <a class="cursor-pointer text-gray-500 hover:text-gray-900">
                    Nosotros
                  </a>
                </li>
                <li class="mt-3">
                  <a class="cursor-pointer text-gray-500 hover:text-gray-900">
                    Preguntas frecuentes
                  </a>
                </li>
                <li class="mt-3">
                  <a class="cursor-pointer text-gray-500 hover:text-gray-900">
                    Guía de tallas
                  </a>
                </li>
              </nav>
            </div>
            <div class="w-full px-4 md:w-1/2 lg:w-1/4">
              <h2 class="title-font mb-3 text-sm font-medium uppercase tracking-widest text-gray-900">
                Visítanos
              </h2>
              <nav class="mb-10 list-none">
                <li class="mt-3">
                  <a class="cursor-pointer text-gray-500 hover:text-gray-900">
                    Calle 53b #25-21 C.C. Galerías
                  </a>
                </li>
                <li class="mt-3">
                  <a class="cursor-pointer text-gray-500 hover:text-gray-900">
                    Local 2158 - Piso 2
                  </a>
                </li>
                <li class="mt-3">
                  <button class="cursor-pointer rounded border border-gray-900 bg-transparent px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                    CÓMO LLEGAR
                  </button>
                </li>
              </nav>
            </div>

            <div class="w-full px-4 md:w-1/2 lg:w-1/4 ">
              <h2 class="title-font mb-3 text-sm font-medium uppercase tracking-widest text-gray-900">
                Contacto
              </h2>
              <nav class="mb-10 list-none">
                <li class="mt-3">
                  <a class="cursor-pointer text-gray-500 hover:text-gray-900">
                    Línea WhatsApp 1
                  </a>
                </li>
                <li class="mt-3">
                  <a class="cursor-pointer text-gray-500 hover:text-gray-900">
                    Línea WhatsApp 2
                  </a>
                </li>
                <li class="mt-3">
                  <a class="cursor-pointer text-gray-500 hover:text-gray-900">
                    Correo electrónico
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div class="bg-gray-300">
          <div class="container mx-auto px-5 py-4">
            <p class="text-sm capitalize text-gray-700 xl:text-center">
              © {new Date().getFullYear()} Lunal's Fashion Design. Todos
              derechos reservados{" "}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
