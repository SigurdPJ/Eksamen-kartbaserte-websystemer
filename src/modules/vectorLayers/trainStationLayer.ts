import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Cluster from "ol/source/Cluster";
import { GeoJSON } from "ol/format";
import { Style, Fill, Text, Icon } from "ol/style";
import { FeatureLike } from "ol/Feature";

// Normal version
const trainIconStyle = new Style({
  image: new Icon({
    src: "/icons/fluent-emoji--station.png",
    scale: 0.5,
    anchor: [0.5, 1],
  }),
});

export const trainStationLayer = new VectorLayer({
  source: new VectorSource({
    url: "geojson/jernbanestasjoner.geojson",
    format: new GeoJSON(),
  }),
  style: trainIconStyle,
});

// Clustered version
const trainSource = new VectorSource({
  url: "geojson/jernbanestasjoner.geojson",
  format: new GeoJSON(),
});

const clusterSource = new Cluster({
  distance: 40,
  minDistance: 20,
  source: trainSource,
});

const styleCache: Record<number, Style> = {};

const clusterStyle = (feature: FeatureLike) => {
  const size = feature.get("features").length;
  if (!styleCache[size]) {
    styleCache[size] = new Style({
      image: new Icon({
        src: "/icons/fluent-emoji--station.png",
        scale: 0.5,
        anchor: [0.5, 1],
      }),
      text: new Text({
        text: size > 1 ? size.toString() : "",
        fill: new Fill({ color: "black" }),
        font: "bold 16px Arial",
        offsetY: 8,
      }),
    });
  }
  return styleCache[size];
};

export const trainStationLayerClustered = new VectorLayer({
  source: clusterSource,
  style: clusterStyle,
});
