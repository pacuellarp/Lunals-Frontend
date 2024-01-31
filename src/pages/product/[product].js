import { useState } from "react";
import { getProduct } from "@services/ProductService";
import Layout from "@layout/MainLayout";
import Gallery from "@components/Gallery/Gallery";
import BuyAction from "@components/BuyAction/BuyAction";
import ProductDescription from "@components/ProductDescription/ProductDescription";
import { CartProvider } from "@context/CartContext";
import Banner from "@components/Banner/Banner";

const ProductPage = ({ product }) => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  const handleBannerActivate = () => {
    setIsBannerVisible(true);
    setTimeout(() => {
      setIsBannerVisible(false);
    }, 2300);
  };

  return (
    <CartProvider>
      <Layout pageName={`${product.name} | Lunal's Fashion Design`}>
        <div className="my-12 flex flex-col">
          <div className="flex flex-col pb-3 pl-6">
            <h1 className="font-inter text-left text-xl leading-normal text-black sm:text-2xl">
              {product.name}
            </h1>
            <p className="font-inter py-1 text-sm">
              Ref.: {`${product.reference}`}
            </p>
          </div>
          <div className="flex flex-col justify-center py-9 md:flex-row">
            <div className="flex flex-col">
              <Gallery product={product} />
              <div className="hidden md:block">
                <ProductDescription product={product} />
              </div>
            </div>
            <BuyAction
              product={product}
              onBannerActivate={handleBannerActivate}
            />
            <div className="block md:hidden">
              <ProductDescription product={product} />
            </div>
            {isBannerVisible && (
              <Banner message="¡Producto agregado!" buyingOrRemoving="buying" />
            )}
          </div>
        </div>
      </Layout>
    </CartProvider>
  );
};

export async function getServerSideProps({ params }) {
  const { product } = params;
  const productData = await getProduct(product * 1);

  return {
    props: {
      product: productData[0],
    },
  };
}

export default ProductPage;
