import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Style, Stroke } from "ol/style";

const countyStyle = new Style({
  stroke: new Stroke({
    color: "green",
    width: 2,
  }),
});

export const countyLayer = new VectorLayer({
  source: new VectorSource({
    url: "geojson/fylker.geojson",
    format: new GeoJSON(),
  }),
  style: countyStyle,
});
