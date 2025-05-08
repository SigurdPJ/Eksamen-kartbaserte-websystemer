/*import React, { useEffect, useRef, useState } from "react";
import { Draw } from "ol/interaction";
import { getLength } from "ol/sphere";
import LineString from "ol/geom/LineString";
import Point from "ol/geom/Point";
import { Style, Stroke, Fill, Text, Circle as CircleStyle } from "ol/style";
import { MeasurementControlsProps } from "../interfaces/MeasurementControlsProps";

export const MeasurementControls: React.FC<MeasurementControlsProps> = ({
  map,
  source,
  activeTool,
  setActiveTool,
}) => {
  const [hasMeasurements, setHasMeasurements] = useState(false);
  const drawRef = useRef<Draw | null>(null);

  const formatLength = (line: LineString) => {
    const meters = getLength(line, { projection: "EPSG:4326" });
    return meters > 1000
      ? `${(meters / 1000).toFixed(1)} km`
      : `${Math.round(meters)} m`;
  };

  const createStyle = (feature: any) => {
    const geometry = feature.getGeometry();
    const styles: Style[] = [];

    if (geometry instanceof LineString) {
      const length = formatLength(geometry);
      const midpoint = new Point(geometry.getCoordinateAt(0.5));

      styles.push(
        new Style({
          stroke: new Stroke({
            color: "rgba(0, 0, 255, 0.7)",
            width: 3,
            lineDash: [10, 10],
          }),
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: "rgba(0, 100, 255, 0.8)" }),
          }),
        }),
        new Style({
          geometry: midpoint,
          text: new Text({
            text: length,
            font: "bold 14px Arial",
            fill: new Fill({ color: "#fff" }),
            backgroundFill: new Fill({ color: "rgba(0, 0, 0, 0.7)" }),
            padding: [3, 5, 3, 5],
            offsetY: -20,
          }),
        }),
      );
    }

    return styles;
  };

  useEffect(() => {
    if (!map) return;

    if (drawRef.current) {
      map.removeInteraction(drawRef.current);
    }

    if (activeTool !== "measure") return;

    const draw = new Draw({
      source,
      type: "LineString",
      style: (feature) => createStyle(feature),
    });

    draw.on("drawend", (event) => {
      const feature = event.feature;
      feature.setStyle((feature) => createStyle(feature));
      setHasMeasurements(true);
    });

    map.addInteraction(draw);
    drawRef.current = draw;

    return () => {
      map.removeInteraction(draw);
    };
  }, [map, activeTool]);

  const toggleMeasurement = () => {
    setActiveTool(activeTool === "measure" ? null : "measure");
  };

  const clearMeasurements = () => {
    source.clear();
    setHasMeasurements(false);
  };

  return (
    <>
      <button className="sidebar-button" onClick={toggleMeasurement}>
        {activeTool === "measure" ? "Stop Measuring" : "Measure"}
      </button>
      <button
        className="sidebar-button"
        onClick={clearMeasurements}
        disabled={!hasMeasurements}
      >
        Clear
      </button>
    </>
  );
};*/
