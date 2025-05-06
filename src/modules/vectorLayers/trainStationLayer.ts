import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Icon, Style } from "ol/style";

const trainIconStyle = new Style({
  image: new Icon({
    src: "/icons/fluent-emoji--station.svg",
    scale: 1,
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
