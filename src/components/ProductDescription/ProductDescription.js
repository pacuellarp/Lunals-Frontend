import React, { useState } from "react";
import { HiPlusSm, HiMinusSm } from "react-icons/hi"; // Asegúrate de instalar react-icons

export default function ProductDescription({ product }) {
  const [expandedOverview, setExpandedOverview] = useState(false);
  const [expandedMaterials, setExpandedMaterials] = useState(false);
  const [isHoveredOverview, setIsHoveredOverview] = useState(false);
  const [isHoveredMaterials, setIsHoveredMaterials] = useState(false);

  const handleMouseEnterOverview = () => {
    setIsHoveredOverview(!isHoveredOverview);
  };

  const handleMouseEnterMaterials = () => {
    setIsHoveredMaterials(!isHoveredMaterials);
  };

  const handleToggleOverview = () => {
    setExpandedOverview(!expandedOverview);
  };

  const handleToggleMaterials = () => {
    setExpandedMaterials(!expandedMaterials);
  };

  return (
    <div className="flex flex-col pb-3 pt-10">
      <h1 className="font-inter py-3 text-left text-lg leading-normal text-black sm:text-xl">
        Descripción
      </h1>
      <div className=" transition-height ease relative flex cursor-pointer flex-col overflow-hidden border-b border-t border-gray-300 bg-white duration-300">
        <div
          className="flex flex-row items-center justify-between"
          onClick={handleToggleOverview}
          onMouseEnter={handleMouseEnterOverview}
          onMouseLeave={handleMouseEnterOverview}
        >
          <div className="p-4">
            <p
              className={`font-inter m-0 text-sm ${
                expandedOverview ? "font-semibold" : ""
              }`}
            >
              Reseña
            </p>
          </div>
          <HiPlusSm
            className={`${expandedOverview ? "hidden" : ""} ${
              isHoveredOverview ? "text-gray-700" : " text-gray-400"
            }`}
          />
          <HiMinusSm
            className={`${expandedOverview ? "" : "hidden"} ${
              isHoveredOverview ? "hover:text-gray-900" : " text-gray-700"
            }`}
          />
        </div>
        {expandedOverview && (
          <p className="py-1 pl-2 text-xs">- {`${product.overview}`}</p>
        )}
      </div>
      <div className=" transition-height ease relative flex cursor-pointer flex-col overflow-hidden border-b border-gray-300 bg-white duration-300">
        <div
          className="flex flex-row items-center justify-between"
          onClick={handleToggleMaterials}
          onMouseEnter={handleMouseEnterMaterials}
          onMouseLeave={handleMouseEnterMaterials}
        >
          <div className="p-4">
            <p
              className={`font-inter m-0 text-sm ${
                expandedMaterials ? "font-semibold" : ""
              }`}
            >
              Materiales
            </p>
          </div>
          <HiPlusSm
            className={`${expandedMaterials ? "hidden" : ""} ${
              isHoveredMaterials ? "text-gray-700" : " text-gray-400"
            }`}
          />
          <HiMinusSm
            className={`${expandedMaterials ? "" : "hidden"} ${
              isHoveredMaterials ? "hover:text-gray-900" : " text-gray-700"
            }`}
          />
        </div>
        {expandedMaterials && (
          <p className="py-1 pl-2 text-xs">
            -Referencia del producto: {`${product.reference}`}.
            <br />
            <br />- {`${product.material}`}.
            <br />
            <br />- Las imágenes mostradas pueden incluir colores que no están
            disponibles.
            <br />
            <br />- Lavado a mano con agua fría o lavandería, no lavar en seco.
          </p>
        )}
      </div>
    </div>
  );
}
