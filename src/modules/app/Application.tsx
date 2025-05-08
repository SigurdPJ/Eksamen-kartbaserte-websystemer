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
import {
  airportLayer,
  airportLayerClustered,
} from "../vectorLayers/airportLayer";
import { railwayLayer } from "../vectorLayers/railwayLayer";
import { drawingLayer, drawingSource } from "../vectorLayers/drawingLayer";
import { countyLayer } from "../vectorLayers/countyLayer";

// Component imports
import { LayerSelect, getLayerByName } from "../components/LayerSelect";
import { ZoomToMeButton } from "../components/ZoomToMeButton";
import { ResetButton } from "../components/ResetViewButton";
import { DrawingControls } from "../components/controls/DrawingControls";
import AirportOverlay from "../components/overlays/AirportOverlay";
import { OverviewMapControl } from "../components/controls/OverviewMapControl";
import { ClusterStationsToggle } from "../components/toggles/ClusterStationsToggle";
import { ShowTrainStationsToggle } from "../components/toggles/ShowTrainStationsToggle";
import { ShowTrainLinesToggle } from "../components/toggles/ShowTrainLinesToggle";
import { ShowAirportsToggle } from "../components/toggles/ShowAirportsToggle";
import TrainStationProps from "../interfaces/TrainStationProps";
import TrainStationOverlay from "../components/overlays/TrainStationOverlay";
import { ShowCountyToggle } from "../components/toggles/ShowCountyToggle";
import { ClusterAirportsToggle } from "../components/toggles/ClusterAirportsToggle";
import { FeatureLike } from "ol/Feature";
import { IconPlacementControls } from "../components/controls/IconPlacementControls";
import { iconLayer, iconSource } from "../vectorLayers/iconLayer";

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
  const [activeTool, setActiveTool] = useState<"draw" | "icon" | null>(null);
  const [selectedAirport, setSelectedAirport] = useState<any[]>([]);
  const [useTrainStationClustering, setUseTrainStationClustering] =
    useState(false);
  const [useAirportClustering, setUseAirportClustering] = useState(false);
  const [showTrainStations, setShowTrainStations] = useState(false);
  const [showRailways, setShowRailways] = useState(false);
  const [showCounty, setShowCounty] = useState(false);
  const [showAirports, setShowAirports] = useState(false);
  const [selectedTrainStation, setSelectedTrainStation] = useState<
    TrainStationProps[]
  >([]);

  const currentLayer = getLayerByName(selectedLayer);
  const activeTrainStationLayer = useTrainStationClustering
    ? trainStationLayerClustered
    : trainStationLayer;
  const activeAirportLayer = useAirportClustering
    ? airportLayerClustered
    : airportLayer;

  useEffect(() => {
    if (!mapRef.current) return;

    const newMap = new Map({
      view: view,
      layers: [currentLayer, drawingLayer],
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
        layerFilter: (layer) => layer === activeAirportLayer,
        hitTolerance: 5,
      });

      if (airportFeatures?.length > 0) {
        const features = airportFeatures[0].get("features");
        if (features) {
          setSelectedAirport(
            features.map((feature: FeatureLike) => feature.getProperties()),
          );
        } else {
          setSelectedAirport([airportFeatures[0].getProperties()]);
        }
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
      if (showRailways) {
        map.addLayer(railwayLayer);
      }
      if (showCounty) {
        map.addLayer(countyLayer);
      }
      if (showAirports) {
        map.addLayer(activeAirportLayer);
      }
      map.addLayer(drawingLayer);
      map.addLayer(iconLayer);
    }
  }, [
    currentLayer,
    activeTrainStationLayer,
    activeAirportLayer,
    showTrainStations,
    showRailways,
    showAirports,
    showCounty,
    map,
  ]);

  return (
    <>
      <section className="appContainer">
        <header className="header">
          <h1>Reiseplanleggeren</h1>
        </header>
        <div className="main-content">
          <div className="sidebar">
            <ResetButton view={view} />
            <ZoomToMeButton view={view} />

            <LayerSelect
              selectedLayer={selectedLayer}
              onLayerChange={setSelectedLayer}
            />
            <div className="control-group">
              <div className="toggle-controls">
                <ShowCountyToggle show={showCounty} setShow={setShowCounty} />

                <ShowTrainLinesToggle
                  show={showRailways}
                  setShow={setShowRailways}
                />
                <ShowTrainStationsToggle
                  show={showTrainStations}
                  setShow={setShowTrainStations}
                />
                <ClusterStationsToggle
                  useClustering={useTrainStationClustering}
                  setUseClustering={setUseTrainStationClustering}
                />
                <ShowAirportsToggle
                  show={showAirports}
                  setShow={setShowAirports}
                />
                <ClusterAirportsToggle
                  useClustering={useAirportClustering}
                  setUseClustering={setUseAirportClustering}
                />
                <IconPlacementControls
                  map={map}
                  activeTool={activeTool}
                  setActiveTool={setActiveTool}
                  vectorSource={iconSource}
                  vectorLayer={iconLayer}
                />
                <DrawingControls
                  map={map}
                  vectorSource={drawingSource}
                  vectorLayer={drawingLayer}
                  activeTool={activeTool}
                  setActiveTool={setActiveTool}
                />
              </div>
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
