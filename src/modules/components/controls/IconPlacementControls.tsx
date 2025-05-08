import React, { useEffect, useState } from "react";
import { Draw } from "ol/interaction";
import { Icon, Style } from "ol/style";
import { ControlsProps } from "../../interfaces/ControlsProps";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

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

  const saveIconsToLocalStorage = () => {
    const features = vectorSource.getFeatures();
    const data = features
      .map((feature) => {
        const geometry = feature.getGeometry();
        const coords =
          geometry?.getType() === "Point"
            ? (geometry as Point).getCoordinates()
            : undefined;

        const style = feature.getStyle();
        let iconSrc: string | undefined;
        if (style instanceof Style) {
          const image = style.getImage();
          if (image instanceof Icon) {
            iconSrc = image.getSrc();
          }
        }

        return {
          coordinates: coords,
          icon: iconSrc,
        };
      })
      .filter((item) => item.coordinates && item.icon); // Remove invalid entries

    localStorage.setItem("placedIcons", JSON.stringify(data));
  };

  const loadIconsFromLocalStorage = () => {
    const data = localStorage.getItem("placedIcons");
    if (!data) return;

    const parsed = JSON.parse(data);
    parsed.forEach(
      ({ coordinates, icon }: { coordinates: number[]; icon: string }) => {
        const feature = new Feature(new Point(coordinates));
        feature.setStyle(
          new Style({
            image: new Icon({
              src: icon,
              scale: 0.5,
            }),
          }),
        );
        vectorSource.addFeature(feature);
      },
    );
    setHasIcons(parsed.length > 0);
  };

  useEffect(() => {
    if (!map) return;
    map.addLayer(vectorLayer);
    loadIconsFromLocalStorage();

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
      saveIconsToLocalStorage();
    });

    map.addInteraction(newDraw);
    setDrawInteraction(newDraw);

    return () => {
      map.removeInteraction(newDraw);
    };
  }, [map, activeTool, iconType]);

  const clearIcons = () => {
    vectorSource.clear();
    localStorage.removeItem("placedIcons");
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
