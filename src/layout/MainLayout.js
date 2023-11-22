import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import HeaderContext from "@context/HeaderContext";

const Layout = ({ children }) => {
  return (
    <HeaderContext>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </HeaderContext>
  );
};

export default Layout;
