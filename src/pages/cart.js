import { CartProvider } from "@context/CartContext";
import Layout from "@layout/MainLayout";
import ShoppingCart from "@components/ShoppingCart/ShoppingCart";
import OrderTotal from "@components/OrderTotal/OrderTotal";
import HorizontalScrollList from "@components/HorizontalScrollList/HorizontalScrollList";

function Cart() {
  return (
    <CartProvider>
      <Layout>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <ShoppingCart />
            <OrderTotal />
          </div>
          {/*<HorizontalScrollList />*/}
        </div>
      </Layout>
    </CartProvider>
  );
}

export default Cart;
