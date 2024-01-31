import Meta from "@components/Meta/Meta";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import HeaderContext from "@context/HeaderContext";
import { CartProvider } from "@context/CartContext";

const Layout = ({ pageName, children }) => {
  return (
    <CartProvider>
      <HeaderContext>
        <div className="flex min-h-screen flex-col">
          <Meta pageName={pageName} />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </HeaderContext>
    </CartProvider>
  );
};

export default Layout;
