import React, { useState, useEffect } from "react";
import { Draw } from "ol/interaction";
import { DrawingControlsProps } from "../interfaces/DrawingControlsProps";

export const DrawingControls: React.FC<DrawingControlsProps> = ({
  map,
  vectorSource,
  activeTool,
  setActiveTool,
}) => {
  const [drawType, setDrawType] = useState<string>("Point");
  const [drawInteraction, setDrawInteraction] = useState<Draw | null>(null);
  const [hasFeatures, setHasFeatures] = useState(false);

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
      type: drawType as any,
    });

    newDraw.on("drawend", () => {
      setHasFeatures(vectorSource.getFeatures().length > 0);
    });

    map.addInteraction(newDraw);
    setDrawInteraction(newDraw);

    return () => {
      map.removeInteraction(newDraw);
    };
  }, [drawType, map, activeTool]);

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

  return (
    <>
      <select
        value={drawType}
        onChange={(e) => {
          setDrawType(e.target.value);
          if (activeTool !== "draw") {
            setActiveTool("draw");
          }
        }}
      >
        <option value="Point">Point</option>
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
      </select>

      <button onClick={toggleDrawing}>
        {activeTool === "draw" ? "Stop Drawing" : "Draw"}
      </button>

      <button onClick={undoLastPoint} disabled={!hasFeatures}>
        Undo
      </button>

      <button onClick={clearAll} disabled={!hasFeatures}>
        Clear
      </button>
    </>
  );
};
