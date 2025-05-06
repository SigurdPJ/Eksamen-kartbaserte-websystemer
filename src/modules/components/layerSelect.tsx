import React from "react";

interface LayerSelectProps {
  selectedLayer: string;
  onLayerChange: (layer: string) => void;
}

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
