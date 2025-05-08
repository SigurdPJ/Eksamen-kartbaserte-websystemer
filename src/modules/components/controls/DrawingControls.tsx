import React, { useState, useEffect } from "react";
import { Draw } from "ol/interaction";
import { ControlsProps } from "../../interfaces/ControlsProps";
import { Style, Stroke, Fill, Text } from "ol/style";
import { getLength, getArea } from "ol/sphere";
import LineString from "ol/geom/LineString";
import Polygon from "ol/geom/Polygon";
import Circle from "ol/geom/Circle";
import Point from "ol/geom/Point";

export const DrawingControls: React.FC<ControlsProps> = ({
  map,
  vectorSource,
  activeTool,
  setActiveTool,
}) => {
  const [drawType, setDrawType] = useState<"LineString" | "Polygon" | "Circle">(
    "LineString",
  );
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

  const createStyle = (feature: any) => {
    const geometry = feature.getGeometry();
    const styles: Style[] = [];

    const getRandomColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.5)`;
    };

    if (geometry instanceof LineString) {
      const length = getLength(geometry, { projection: "EPSG:4326" });
      const midpoint = geometry.getCoordinateAt(0.5);
      const label =
        length > 1000
          ? `${(length / 1000).toFixed(2)} km`
          : `${Math.round(length)} m`;

      styles.push(
        new Style({
          stroke: new Stroke({
            color: "#3399CC",
            width: 2,
          }),
        }),
        new Style({
          geometry: new Point(midpoint),
          text: new Text({
            text: label,
            font: "bold 14px",
            offsetY: -15,
          }),
        }),
      );
    } else if (geometry instanceof Polygon) {
      const area = getArea(geometry, { projection: "EPSG:4326" });
      const perimeter = getLength(geometry.getLinearRing(0)!, {
        projection: "EPSG:4326",
      });

      const label = `Areal: ${
        area > 1_000_000
          ? (area / 1_000_000).toFixed(2) + " km²"
          : Math.round(area) + " m²"
      } Omkrets: ${
        perimeter > 1000
          ? (perimeter / 1000).toFixed(2) + " km"
          : Math.round(perimeter) + " m"
      }`;

      styles.push(
        new Style({
          stroke: new Stroke({ width: 2 }),
          fill: new Fill({ color: "rgba(51, 153, 204, 0.2)" }),
        }),
        new Style({
          geometry: geometry.getInteriorPoint(),
          text: new Text({
            text: label,
            font: "bold 20px",
            offsetY: -20,
          }),
        }),
      );
    } else if (geometry instanceof Circle) {
      const center = geometry.getCenter();
      const edge = [center[0] + geometry.getRadius(), center[1]];
      const radiusLine = new LineString([center, edge]);
      const radius = getLength(radiusLine, { projection: "EPSG:4326" });
      const area = Math.PI * Math.pow(radius, 2);

      const text = `Radius: ${Math.round(radius)} m Areal: ${
        area > 1_000_000
          ? (area / 1_000_000).toFixed(2) + " km²"
          : Math.round(area) + " m²"
      }`;

      styles.push(
        new Style({
          stroke: new Stroke({ color: "dodgerblue", width: 2 }),
          fill: new Fill({ color: getRandomColor() }),
        }),
        new Style({
          geometry: new Point(center),
          text: new Text({
            text,
            font: "bold 12px",
            offsetY: -20,
          }),
        }),
      );
    }

    return styles;
  };

  useEffect(() => {
    if (!map) return;

    if (drawInteraction) {
      map.removeInteraction(drawInteraction);
      setDrawInteraction(null);
    }

    if (activeTool !== "draw") return;

    const newDraw = new Draw({
      source: vectorSource,
      type: drawType,
      style: (feature) => createStyle(feature),
    });

    newDraw.on("drawend", (event) => {
      event.feature.setStyle((f) => createStyle(f));
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
    <div className="control-section" id="draw-section">
      <p>Tegn og mål!</p>
      <select
        className="sidebar-button"
        value={drawType}
        onChange={(e) => {
          setDrawType(e.target.value as "LineString" | "Polygon" | "Circle");
          setActiveTool("draw");
        }}
      >
        <option value="LineString">Linje</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Sirkel (Partymode!! Woooh!)</option>
      </select>

      <button className="sidebar-button" onClick={toggleDrawing}>
        {activeTool === "draw" ? "Stopp" : "Tegn"}
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
  );
};
