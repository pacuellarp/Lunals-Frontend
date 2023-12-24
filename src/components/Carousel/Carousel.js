import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import { getPhotos } from "@services/PhotosService";
import { getVideos } from "@services/VideosService";
import YoutubeVideo from "@components/YouTubeVideo/YouTubeVideo";
import { HeaderContext } from "@context/HeaderContext";

import "swiper/css";
import "swiper/css/pagination";

export default function Carousel() {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [heightCarousel, setHeightCarousel] = useState(0);

  const { headerHeight } = useContext(HeaderContext);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await getPhotos(1);
        setPhotos(response);
      } catch (error) {
        throw error;
      }
    }

    async function fetchVideos() {
      try {
        const response = await getVideos(1);
        setVideos(response);
      } catch (error) {
        throw error;
      }
    }

    fetchPhotos();
    fetchVideos();
    if (headerHeight !== null) {
      const height = window.innerHeight - headerHeight;
      setHeightCarousel(height);
    }
  }, [headerHeight]);

  let carouselMessages = [
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
        modules={[Mousewheel, Pagination]}
        style={{ height: heightCarousel }}
        className="w-full rounded-lg"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={photo.id}>
            <figure className="flex h-full w-full items-center justify-center">
              <Image
                src={photo.link}
                width={768}
                height={1024}
                className="block h-full w-full object-cover"
                alt={`Slide ${index}`}
                style={{ objectPosition: "top" }} // Ajuste para mostrar desde la parte superior
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

        {videos.map((video, index) => (
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
        ))}
      </Swiper>
    </>
  );
}
