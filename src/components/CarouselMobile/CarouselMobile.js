import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import { HeaderContext } from "@context/HeaderContext";

import "swiper/css";
import "swiper/css/pagination";

export default function CarouselMobile() {
  const [heightCarousel, setHeightCarousel] = useState(0);

  const { headerHeight } = useContext(HeaderContext);

  const photos = [
    {
      id: 1,
      link: "https://drive.google.com/uc?export=view&id=16dzYqZi-s-SL3Po75G5h-N4MkywPQD4M",
    },
    {
      id: 2,
      link: "https://drive.google.com/uc?export=view&id=14anxyQaPr7RCfgxaAH1ltpJ_qSCF0Pof",
    },
    {
      id: 3,
      link: "https://drive.google.com/uc?export=view&id=1igQ-193bfu_5Qs61FbBVJRnLkxTwzhtW",
    },
    {
      id: 4,
      link: "https://drive.google.com/uc?export=view&id=1_v2TxD05aAPs6fd9ajTNXubB4-2bXw_n",
    },
  ];

  useEffect(() => {
    if (headerHeight !== null) {
      const height = window.innerHeight - headerHeight;
      setHeightCarousel(height);
    }
  }, [headerHeight]);

  let carouselMessages = [
    ["Lorem ipsum", "Lorem ipsum"],
    ["Lorem ipsum", "Lorem ipsum"],
    ["Lorem ipsum", "Lorem ipsum"],
    ["Lorem ipsum", "Lorem ipsum"],
  ];

  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={{ releaseOnEdges: true, thresholdTime: 500 }}
        pagination={{
          clickable: true,
        }}
        touchReleaseOnEdges={true}
        modules={[Mousewheel, Pagination]}
        style={{ height: heightCarousel }}
        className="w-full rounded-lg"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={photo.id}>
            <figure className="flex h-full w-full items-center justify-center">
              <Image
                src={photo.link}
                fill={true}
                className="block h-full w-full object-cover"
                alt={`Slide ${index}`}
                priority={true}
                quality={100}
                style={{ objectPosition: "center" }} // Ajuste para mostrar desde la parte superior
              />
              <figcaption className="absolute left-40 top-1/2 w-full max-w-xl -translate-y-1/2 transform text-left text-white">
                <h2
                  className="font-inter mb-2 text-base font-medium sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                  style={{
                    color: "#EFE2E2",
                    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {carouselMessages[index][0]}
                </h2>
                <p
                  className="font-inter mb-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                  style={{
                    color: "#EFE2E2",
                    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {carouselMessages[index][1]}
                </p>
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}

        {/*{videos.map((video, index) => (
          <SwiperSlide key={video.id}>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <YoutubeVideo
                videoId={video.link}
                className="block h-full w-full object-cover"
                alt={`SlideV ${index}`}
              />
            </div>
            <figcaption className="text-container">Video {index}</figcaption>
        </SwiperSlide>
        ))}*/}
      </Swiper>
    </>
  );
}
