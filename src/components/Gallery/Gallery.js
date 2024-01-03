import React, { useState, useEffect } from "react";
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
        throw error;
      }
    };

    fetchPhotos();
  }, []);

  const selectPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <div className="flex flex-row justify-around	">
      <div className="mr-4 w-12">
        {photos.map((photo) => (
          <figure
            key={photo.id}
            className="relative mb-4 w-full cursor-pointer border border-gray-300"
            onMouseEnter={() => selectPhoto(photo)}
          >
            <img
              src={photo.link}
              alt={`Photo ${photo.id}`}
              className="w-full"
            />
            <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 hover:opacity-0"></div>
          </figure>
        ))}
      </div>
      <div className="flex flex-col">
        <figure className="w-3/5">
          {selectedPhoto && (
            <img
              src={selectedPhoto.link}
              alt={`Selected photo`}
              className="w-full"
            />
          )}
        </figure>
        <div className="flex flex-col">
          <p>Descripción</p>
        </div>
      </div>
    </div>
  );
}
