// src/components/layerSelect.tsx
import React from "react";
import { osmLayer } from "../tileLayers/osmLayer";
import { stadiaLightLayer } from "../tileLayers/stadiaLightLayer";
import { stadiaDarkLayer } from "../tileLayers/stadiaDarkLayer";
import { aerialPhotoLayer } from "../tileLayers/aerialPhotoLayer";
import { polarLayer } from "../tileLayers/polarLayer";
import { mapboxLayer } from "../tileLayers/mapboxLayer";

interface LayerSelectProps {
  selectedLayer: string;
  onLayerChange: (layer: string) => void;
}

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

export const LayerSelect: React.FC<LayerSelectProps> = ({
  selectedLayer,
  onLayerChange,
}) => {
  return (
    <select
      value={selectedLayer}
      onChange={(e) => onLayerChange(e.target.value)}
    >
      <option value="osm">OpenStreetMap</option>
      <option value="stadia-light">Stadia Light</option>
      <option value="stadia-dark">Stadia Dark</option>
      <option value="aerial-photo">Aerial</option>
      <option value="polar-layer">Polar</option>
      <option value="mapbox">Mapbox</option>
    </select>
  );
};
