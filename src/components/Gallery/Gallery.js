import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getPhotos } from "@services/PhotosService";

export default function Gallery({ product }) {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const fetchedPhotos = await getPhotos(product.id);
        setPhotos(fetchedPhotos);
        setSelectedPhoto(fetchedPhotos[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPhotos();
  }, []);

  const selectPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <div className="flex flex-row justify-around max-[500px]:pl-12">
      <div className="mr-4 w-12">
        {photos.map((photo) => (
          <figure
            key={photo.id}
            className="relative mb-4 w-full cursor-pointer border border-gray-300"
            onMouseEnter={() => selectPhoto(photo)}
          >
            <Image
              src={photo.link}
              alt={`Photo ${photo.id}`}
              width={300}
              height={200}
              className="w-full"
            />
            <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 hover:opacity-0"></div>
          </figure>
        ))}
      </div>
      <div className="flex flex-col">
        <figure className="w-4/5">
          {selectedPhoto && (
            <Image
              src={selectedPhoto.link}
              alt={`Selected photo`}
              width={500}
              height={400}
              className="w-full"
            />
          )}
        </figure>
      </div>
    </div>
  );
}
