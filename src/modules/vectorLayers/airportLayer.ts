import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Icon, Style, Circle as CircleStyle, Fill, Stroke } from "ol/style";

const airplaneIconStyle = new Style({
  image: new Icon({
    src: "/icons/fluent-emoji--airplane.svg",
    scale: 1.2,
    anchor: [0.5, 1],
  }),
});

export const airportLayer = new VectorLayer({
  source: new VectorSource({
    url: "geojson/flyplasser.geojson",
    format: new GeoJSON(),
  }),
  style: airplaneIconStyle,
});
