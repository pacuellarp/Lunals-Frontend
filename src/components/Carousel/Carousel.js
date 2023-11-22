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

  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={{ releaseOnEdges: true }}
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
              />
            </figure>
            <figcaption className="text-container">Photo {index}</figcaption>
          </SwiperSlide>
        ))}

        {videos.map((video, index) => (
          <SwiperSlide key={video.id}>
            <YoutubeVideo
              videoId={video.link}
              className="block h-full w-full object-cover"
              alt={`SlideV ${index}`}
            />
            <figcaption className="text-container">Video {index}</figcaption>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
