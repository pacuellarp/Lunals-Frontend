import { getProduct } from "@services/ProductService";
import Layout from "@layout/MainLayout";
import Gallery from "@components/Gallery/Gallery";
import BuyAction from "@components/BuyAction/BuyAction";

const ProductPage = ({ product }) => {
  return (
    <Layout>
      <div class="my-12 flex flex-col">
        <h1 class="font-inter py-3 pl-6 text-left text-xl font-normal leading-normal text-black sm:text-2xl">
          {product.name}
        </h1>
        <div class="flex flex-row justify-center py-9">
          <Gallery product={product} />
          <BuyAction product={product} />
        </div>
      </div>
    </Layout>
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
