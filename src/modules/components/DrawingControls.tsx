import React, { useState, useEffect } from "react";
import { Draw } from "ol/interaction";
import { DrawingControlsProps } from "../interfaces/DrawingControlsProps";
import { Icon, Style, Stroke, Fill, Circle as CircleStyle } from "ol/style";

export const DrawingControls: React.FC<DrawingControlsProps> = ({
  map,
  vectorSource,
  activeTool,
  setActiveTool,
}) => {
  const [drawType, setDrawType] = useState<
    "Point" | "LineString" | "Polygon" | "Circle"
  >("LineString");
  const [iconType, setIconType] = useState<string>(
    "/icons/fluent-emoji--heart-exclamation.png",
  );
  const [drawInteraction, setDrawInteraction] = useState<Draw | null>(null);
  const [hasFeatures, setHasFeatures] = useState(false);
  const [isIconMode, setIsIconMode] = useState(false);

  useEffect(() => {
    const checkFeatures = () => {
      setHasFeatures(vectorSource.getFeatures().length > 0);
    };

    checkFeatures();
    vectorSource.on("addfeature", checkFeatures);
    vectorSource.on("removefeature", checkFeatures);

    return () => {
      vectorSource.un("addfeature", checkFeatures);
      vectorSource.un("removefeature", checkFeatures);
    };
  }, [vectorSource]);

  useEffect(() => {
    if (!map) return;

    if (drawInteraction) {
      map.removeInteraction(drawInteraction);
      setDrawInteraction(null);
    }

    if (activeTool !== "draw") return;

    const newDraw = new Draw({
      source: vectorSource,
      type: isIconMode ? "Point" : drawType,
    });
    newDraw.on("drawend", (event) => {
      const feature = event.feature;

      if (isIconMode && drawType === "Point") {
        const iconStyle = new Style({
          image: new Icon({
            src: iconType,
            scale: 0.5,
          }),
        });
        feature.setStyle(iconStyle);
      } else {
        const defaultStyle = new Style({
          stroke: new Stroke({
            color: "#3399CC",
            width: 2,
          }),
          fill: new Fill({
            color: "rgba(51, 153, 204, 0.2)",
          }),
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({ color: "#3399CC" }),
            stroke: new Stroke({ color: "#fff", width: 1 }),
          }),
        });
        feature.setStyle(defaultStyle);
      }

      setHasFeatures(vectorSource.getFeatures().length > 0);
    });

    map.addInteraction(newDraw);
    setDrawInteraction(newDraw);

    return () => {
      map.removeInteraction(newDraw);
    };
  }, [drawType, map, activeTool, iconType, isIconMode]);

  const undoLastPoint = () => {
    const features = vectorSource.getFeatures();
    if (features.length > 0) {
      vectorSource.removeFeature(features[features.length - 1]);
    }
  };

  const clearAll = () => {
    vectorSource.clear();
    setHasFeatures(false);
  };

  const toggleDrawing = () => {
    setActiveTool(activeTool === "draw" ? null : "draw");
  };

  const toggleIconMode = () => {
    setIsIconMode(!isIconMode);
    setDrawType("Point");
    setActiveTool("draw");
  };

  return (
    <div className="sidebar-controls">
      <div className="control-section" id="draw-icon-section">
        <p>
          Velg ikoner og merk steder du liker, vil besøke eller steder du vil
          campe.
        </p>
        <select
          className="sidebar-button"
          value={iconType}
          onChange={(e) => setIconType(e.target.value)}
        >
          <option value="/icons/fluent-emoji--heart-exclamation.png">
            Hjerte
          </option>
          <option value="/icons/fluent-emoji--glowing-star.png">Stjerne</option>
          <option value="/icons/fluent-emoji--camping.png">Camping</option>
        </select>
        <button className="sidebar-button" onClick={toggleIconMode}>
          {isIconMode ? "Avbryt" : "Plasser ikoner"}
        </button>

        <div className="undo-or-delete-panel">
          <button
            className="sidebar-button half"
            onClick={undoLastPoint}
            disabled={!hasFeatures}
          >
            Angre
          </button>
          <button
            className="sidebar-button half"
            onClick={clearAll}
            disabled={!hasFeatures}
          >
            Slett alt
          </button>
        </div>
      </div>

      <div className="control-section" id="draw-section">
        <p>Tegn på kartet, gjør hva du vil med det!</p>
        <select
          className="sidebar-button"
          value={drawType}
          onChange={(e) =>
            setDrawType(
              e.target.value as "Point" | "LineString" | "Polygon" | "Circle",
            )
          } // typecasting
        >
          <option value="LineString">Linje</option>
          <option value="Polygon">Polygon</option>
          <option value="Circle">Sirkel</option>
        </select>

        <button className="sidebar-button" onClick={toggleDrawing}>
          {activeTool === "draw" ? "Stopp" : "Tegn"}
        </button>
      </div>
    </div>
  );
};
