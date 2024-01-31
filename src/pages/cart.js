import { useState } from "react";
import { CartProvider } from "@context/CartContext";
import Layout from "@layout/MainLayout";
import ShoppingCart from "@components/ShoppingCart/ShoppingCart";
import OrderTotal from "@components/OrderTotal/OrderTotal";
import Banner from "@components/Banner/Banner";

function Cart() {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  const handleBannerActivate = () => {
    setIsBannerVisible(true);
    setTimeout(() => {
      setIsBannerVisible(false);
    }, 2300);
  };

  return (
    <CartProvider>
      <Layout pageName={"Carrito de compras | Lunal's Fashion Design"}>
        <div className="flex flex-col">
          <div className="flex flex-col items-center xl:flex-row xl:justify-between">
            <ShoppingCart handleRemoveProduct={handleBannerActivate} />
            <OrderTotal />
          </div>
          {/*<HorizontalScrollList />*/}
        </div>
        {isBannerVisible && (
          <Banner
            message="Producto eliminado del carrito."
            buyingOrRemoving="removing"
          />
        )}
      </Layout>
    </CartProvider>
  );
}

export default Cart;
