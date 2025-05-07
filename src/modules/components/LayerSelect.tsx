import React, { useState, useEffect, useRef } from "react";
import { LayerSelectProps } from "../interfaces/LayerSelectProps";
import { stadiaLightLayer } from "../tileLayers/stadiaLightLayer";
import { stadiaDarkLayer } from "../tileLayers/stadiaDarkLayer";
import { aerialPhotoLayer } from "../tileLayers/aerialPhotoLayer";
import { polarLayer } from "../tileLayers/polarLayer";
import { mapboxLayer } from "../tileLayers/mapboxLayer";
import { osmLayer } from "../tileLayers/osmLayer";
export const getLayerByName = (layerName: string) => {
  switch (layerName) {
    case "stadia-light":
      return stadiaLightLayer;
    case "stadia-dark":
      return stadiaDarkLayer;
    case "aerial-photo":
      return aerialPhotoLayer;
    case "polar-layer":
      return polarLayer;
    case "mapbox":
      return mapboxLayer;
    default:
      return osmLayer;
  }
};

const layers = [
  { id: "osm", name: "OpenStreetMap", icon: "/icons/osm.png" },
  { id: "stadia-light", name: "Stadia Light", icon: "/icons/stadiaLight.png" },
  { id: "stadia-dark", name: "Stadia Dark", icon: "/icons/stadiaDark.png" },
  { id: "aerial-photo", name: "Aerial", icon: "/icons/aerial.png" },
  { id: "polar-layer", name: "Polar", icon: "/icons/polar.png" },
  { id: "mapbox", name: "Mapbox", icon: "/icons/mapBox.png" },
];

export const LayerSelect: React.FC<LayerSelectProps> = ({
  selectedLayer,
  onLayerChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const selected = layers.find((l) => l.id === selectedLayer) || layers[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = dropdownRef.current;
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef}>
      <button
        className="layer-select-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={selected.icon} alt={selected.name} />
        {selected.name}
      </button>

      {isOpen && (
        <div className="layer-select-dropdown">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className="layer-option"
              onClick={() => {
                onLayerChange(layer.id);
                setIsOpen(false);
              }}
            >
              <img src={layer.icon} alt={layer.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
