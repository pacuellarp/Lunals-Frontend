// components/Meta.js

import Head from "next/head";

export default function Meta({ pageName }) {
  return (
    <Head>
      <title>{`${pageName}`}</title>

      <meta
        name="description"
        content="Ecommerce de Lunal's Fashion Design, tienda de moda de diseño y fabricación 100% nacional."
      />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta charset="utf-8" />
    </Head>
  );
}
