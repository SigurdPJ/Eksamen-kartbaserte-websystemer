import React, { useEffect, useState } from "react";
import { Draw } from "ol/interaction";
import { Icon, Style } from "ol/style";
import { ControlsProps } from "../../interfaces/ControlsProps";

export const IconPlacementControls: React.FC<ControlsProps> = ({
  map,
  vectorSource,
  vectorLayer,
  activeTool,
  setActiveTool,
}) => {
  const [iconType, setIconType] = useState(
    "/icons/fluent-emoji--heart-exclamation.png",
  );
  const [drawInteraction, setDrawInteraction] = useState<Draw | null>(null);
  const [hasIcons, setHasIcons] = useState(false);

  useEffect(() => {
    if (!map) return;
    map.addLayer(vectorLayer);

    return () => {
      map.removeLayer(vectorLayer);
    };
  }, [map]);

  useEffect(() => {
    if (!map) return;

    if (drawInteraction) {
      map.removeInteraction(drawInteraction);
      setDrawInteraction(null);
    }

    if (activeTool !== "icon") return;

    const newDraw = new Draw({
      source: vectorSource,
      type: "Point",
    });

    newDraw.on("drawend", (event) => {
      const feature = event.feature;
      feature.setStyle(
        new Style({
          image: new Icon({
            src: iconType,
            scale: 0.5,
          }),
        }),
      );
      setHasIcons(vectorSource.getFeatures().length > 0);
    });

    map.addInteraction(newDraw);
    setDrawInteraction(newDraw);

    return () => {
      map.removeInteraction(newDraw);
    };
  }, [map, activeTool, iconType]);

  const clearIcons = () => {
    vectorSource.clear();
    setHasIcons(false);
  };

  const toggleIconMode = () => {
    setActiveTool(activeTool === "icon" ? null : "icon");
  };

  return (
    <div className="control-section" id="icon-placer-section">
      <p>
        Velg ikoner og merk steder du liker, vil besøke eller steder du vil
        campe.
      </p>
      <select
        className="sidebar-button"
        value={iconType}
        onChange={(e) => {
          setIconType(e.target.value);
          setActiveTool("icon");
        }}
      >
        <option value="/icons/fluent-emoji--heart-exclamation.png">
          Hjerte
        </option>
        <option value="/icons/fluent-emoji--glowing-star.png">Stjerne</option>
        <option value="/icons/fluent-emoji--camping.png">Camping</option>
      </select>
      <button className="sidebar-button" onClick={toggleIconMode}>
        {activeTool === "icon" ? "Avbryt" : "Plasser ikoner"}
      </button>
      <button
        className="sidebar-button"
        onClick={clearIcons}
        disabled={!hasIcons}
      >
        Slett ikoner
      </button>
    </div>
  );
};
