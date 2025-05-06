import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import { useGeographic } from "ol/proj";
import "ol/ol.css";

// Vector layer imports
import { trainStationLayer } from "../vectorLayers/trainStationLayer";
import { airportLayer } from "../vectorLayers/airportLayer";
import { railwayLayer } from "../vectorLayers/railwayLayer";
import {
  measurementLayer,
  measurementSource,
} from "../vectorLayers/measurementLayer";
import { drawingLayer, drawingSource } from "../vectorLayers/drawingLayer";

// Component imports
import { LayerSelect, getLayerByName } from "../components/layerSelect";
import { ZoomToMeButton } from "../components/zoomToMeButton";
import { ResetButton } from "../components/resetViewButton";
import { DrawingControls } from "../components/drawingControls";
import { MeasurementControls } from "../components/measurementControls";

useGeographic();

export function Application() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLayer, setSelectedLayer] = useState("osm");
  const [view, setView] = useState(
    () =>
      new View({
        center: [10.8, 59.9],
        zoom: 7,
        projection: "EPSG:4326",
      }),
  );
  const [map, setMap] = useState<Map | null>(null);
  const [activeTool, setActiveTool] = useState<"draw" | "measure" | null>(null);

  const currentLayer = getLayerByName(selectedLayer);

  useEffect(() => {
    if (!mapRef.current) return;

    const newMap = new Map({
      view: view,
      layers: [currentLayer, drawingLayer, measurementLayer],
    });

    newMap.setTarget(mapRef.current);
    setMap(newMap);

    return () => {
      newMap.setTarget(undefined);
      newMap.dispose();
    };
  }, []);

  useEffect(() => {
    if (map) map.setView(view);
  }, [view, map]);

  useEffect(() => {
    const projection = currentLayer.getSource()?.getProjection();
    if (projection) {
      setView(
        (v) =>
          new View({
            center: v.getCenter(),
            zoom: v.getZoom(),
            projection,
          }),
      );
    }
  }, [currentLayer]);

  useEffect(() => {
    if (map) {
      map.getLayers().clear();
      map.addLayer(currentLayer);
      map.addLayer(trainStationLayer);
      map.addLayer(airportLayer);
      map.addLayer(railwayLayer);
      map.addLayer(drawingLayer);
      map.addLayer(measurementLayer);
    }
  }, [currentLayer, map, trainStationLayer, airportLayer, railwayLayer]);

  return (
    <>
      <section>
        <LayerSelect
          selectedLayer={selectedLayer}
          onLayerChange={setSelectedLayer}
        />
        <br />
        <div className="control-group">
          <DrawingControls
            map={map}
            vectorSource={drawingSource}
            vectorLayer={drawingLayer}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
          />
          <br />
          <MeasurementControls
            map={map}
            source={measurementSource}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
          />
          <br />
          <ResetButton view={view} />
          <ZoomToMeButton view={view} />
        </div>
      </section>
      <div ref={mapRef} className="map-view" />
    </>
  );
}
