import Layout from "@layout/MainLayout";
import Carousel from "@components/Carousel/Carousel";
import CarouselMobile from "@components/CarouselMobile/CarouselMobile";

export default function Home() {
  return (
    <Layout pageName={"Lunal's Fashion Design"}>
      <div className="hidden custom:block">
        <Carousel />
      </div>
      <div className="custom:hidden">
        <CarouselMobile />
      </div>
    </Layout>
  );
}
