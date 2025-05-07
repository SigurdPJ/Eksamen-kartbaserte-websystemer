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
import { airportLayer } from "../vectorLayers/airportLayer"; // Import airports layer
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
import { ShowTrainStationsToggle } from "../components/ShowTrainStationsToggle";
import { ShowTrainLinesToggle } from "../components/ShowTrainLinesToggle";
import { ShowAirportsToggle } from "../components/ShowAirportsToggle";
import TrainStationProps from "../interfaces/TrainStationProps";
import TrainStationOverlay from "../components/TrainStationOverlay";

useGeographic();

export function Application() {
  // Refs
  const mapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const trainStationOverlayRef = useRef<HTMLDivElement>(null);

  // States
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
  const [showTrainStations, setShowTrainStations] = useState(false);
  const [showTrainlines, setShowTrainlines] = useState(false);
  const [showAirports, setShowAirports] = useState(false);
  const [selectedTrainStation, setSelectedTrainStation] = useState<
    TrainStationProps[]
  >([]);

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

    const trainStationOverlay = new Overlay({
      element: trainStationOverlayRef.current || undefined,
      autoPan: true,
    });
    newMap.addOverlay(trainStationOverlay);

    newMap.on("click", (e) => {
      // Airport features
      const airportFeatures = newMap.getFeaturesAtPixel(e.pixel, {
        layerFilter: (layer) => layer === airportLayer,
        hitTolerance: 5,
      });

      if (airportFeatures?.length > 0) {
        setSelectedAirport(airportFeatures.map((f) => f.getProperties()));
        overlay.setPosition(e.coordinate);
      } else {
        setSelectedAirport([]);
        overlay.setPosition(undefined);
      }

      // Train station features
      const stationFeatures = newMap.getFeaturesAtPixel(e.pixel, {
        layerFilter: (layer) => layer === activeTrainStationLayer,
        hitTolerance: 5,
      });

      if (stationFeatures?.length > 0) {
        const trainStationData = stationFeatures.map((f) => {
          const properties = f.getProperties();
          return { navn: properties.navn };
        });

        setSelectedTrainStation(trainStationData);
        trainStationOverlay.setPosition(e.coordinate);
      } else {
        setSelectedTrainStation([]);
        trainStationOverlay.setPosition(undefined);
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
      if (showTrainStations) {
        map.addLayer(activeTrainStationLayer);
      }
      if (showTrainlines) {
        map.addLayer(railwayLayer);
      }
      if (showAirports) {
        map.addLayer(airportLayer);
      }
      map.addLayer(drawingLayer);
      map.addLayer(measurementLayer);
    }
  }, [
    currentLayer,
    activeTrainStationLayer,
    showTrainStations,
    showTrainlines,
    showAirports,
    map,
  ]);

  return (
    <>
      <section className="appContainer">
        <header className="header">
          <h1>Norgesferiekartet!</h1>
        </header>
        <div className="main-content">
          <div className="sidebar">
            <LayerSelect
              selectedLayer={selectedLayer}
              onLayerChange={setSelectedLayer}
            />
            <div className="toggle-controls">
              <ClusterStationsToggle
                useClustering={useClustering}
                setUseClustering={setUseClustering}
              />
              <ShowTrainStationsToggle
                show={showTrainStations}
                setShow={setShowTrainStations}
              />
              <ShowTrainLinesToggle
                show={showTrainlines}
                setShow={setShowTrainlines}
              />
              <ShowAirportsToggle
                show={showAirports}
                setShow={setShowAirports}
              />
            </div>
            <div className="control-group">
              <DrawingControls
                map={map}
                vectorSource={drawingSource}
                vectorLayer={drawingLayer}
                activeTool={activeTool}
                setActiveTool={setActiveTool}
              />

              <MeasurementControls
                map={map}
                source={measurementSource}
                activeTool={activeTool}
                setActiveTool={setActiveTool}
              />

              <ResetButton view={view} />
              <ZoomToMeButton view={view} />
            </div>
          </div>
          <div ref={mapRef} className="map-view">
            <div ref={overlayRef}>
              <AirportOverlay features={selectedAirport} />
            </div>
            <div ref={trainStationOverlayRef}>
              <TrainStationOverlay features={selectedTrainStation} />
            </div>
            {map && <OverviewMapControl map={map} collapsed={true} />}
          </div>
        </div>
      </section>
    </>
  );
}
