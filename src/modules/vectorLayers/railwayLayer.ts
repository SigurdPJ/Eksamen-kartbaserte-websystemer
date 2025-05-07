import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Style, Stroke } from "ol/style";

const railwayStyle = new Style({
  stroke: new Stroke({
    color: "purple",
    width: 2,
  }),
});

export const railwayLayer = new VectorLayer({
  source: new VectorSource({
    url: "geojson/jernbanelinjer.geojson",
    format: new GeoJSON(),
  }),
  style: railwayStyle,
});
