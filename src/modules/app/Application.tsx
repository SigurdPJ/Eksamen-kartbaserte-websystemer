import React, { useEffect, useRef, useState } from "react";
import { Map, View, Overlay } from "ol";
import { useGeographic } from "ol/proj";
import "ol/ol.css";
import "./Application.css";

// Vector layer imports
import {
  trainStationLayer,
  trainStationLayerClustered,
} from "../vectorLayers/trainStationLayer";
import { airportLayer } from "../vectorLayers/airportLayer";
import { railwayLayer } from "../vectorLayers/railwayLayer";
import {
  measurementLayer,
  measurementSource,
} from "../vectorLayers/measurementLayer";
import { drawingLayer, drawingSource } from "../vectorLayers/drawingLayer";

// Component imports
import { LayerSelect, getLayerByName } from "../components/LayerSelect";
import { ZoomToMeButton } from "../components/ZoomToMeButton";
import { ResetButton } from "../components/ResetViewButton";
import { DrawingControls } from "../components/DrawingControls";
import { MeasurementControls } from "../components/MeasurementControls";
import AirportOverlay from "../components/AirportOverlay";
import { OverviewMapControl } from "../components/OverviewMapControl";
import { ClusterStationsToggle } from "../components/ClusterStationsToggle";

useGeographic();

export function Application() {
  const mapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
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
  const [selectedAirport, setSelectedAirport] = useState<any[]>([]);
  const [useClustering, setUseClustering] = useState(false);

  const currentLayer = getLayerByName(selectedLayer);
  const activeTrainStationLayer = useClustering
    ? trainStationLayerClustered
    : trainStationLayer;

  useEffect(() => {
    if (!mapRef.current) return;

    const newMap = new Map({
      view: view,
      layers: [currentLayer, drawingLayer, measurementLayer],
    });

    const overlay = new Overlay({
      element: overlayRef.current || undefined,
      autoPan: true,
    });
    newMap.addOverlay(overlay);

    newMap.on("click", (e) => {
      const features = newMap.getFeaturesAtPixel(e.pixel, {
        layerFilter: (layer) => layer === airportLayer,
        hitTolerance: 5,
      });

      if (features && features.length > 0) {
        setSelectedAirport(features.map((f) => f.getProperties()));
        overlay.setPosition(e.coordinate);
      } else {
        setSelectedAirport([]);
        overlay.setPosition(undefined);
      }
    });

    newMap.setTarget(mapRef.current);
    setMap(newMap);

    return () => {
      newMap.setTarget(undefined);
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
      map.addLayer(activeTrainStationLayer); // Clustering toggles this
      map.addLayer(airportLayer);
      map.addLayer(railwayLayer);
      map.addLayer(drawingLayer);
      map.addLayer(measurementLayer);
    }
  }, [currentLayer, activeTrainStationLayer, map]);

  return (
    <>
      <section>
        <LayerSelect
          selectedLayer={selectedLayer}
          onLayerChange={setSelectedLayer}
        />
        <br />
        <ClusterStationsToggle
          useClustering={useClustering}
          setUseClustering={setUseClustering}
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
      <div ref={mapRef} className="map-view">
        <div ref={overlayRef}>
          <AirportOverlay features={selectedAirport} />
        </div>
        {map && <OverviewMapControl map={map} collapsed={true} />}
      </div>
    </>
  );
}
