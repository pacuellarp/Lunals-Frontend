import { CartProvider } from "@context/CartContext";
import Layout from "@layout/MainLayout";
import ShoppingCart from "@components/ShoppingCart/ShoppingCart";

function Cart() {
  return (
    <CartProvider>
      <Layout>
        <ShoppingCart />
      </Layout>
    </CartProvider>
  );
}

export default Cart;
