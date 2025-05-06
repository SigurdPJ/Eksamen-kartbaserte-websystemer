import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

export const railwayLayer = new VectorLayer({
  source: new VectorSource({
    url: "geojson/jernbanelinjer.geojson",
    format: new GeoJSON(),
  }),
});
