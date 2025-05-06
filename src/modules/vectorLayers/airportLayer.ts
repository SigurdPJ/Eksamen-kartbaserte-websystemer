import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

export const airportLayer = new VectorLayer({
  source: new VectorSource({
    url: "geojson/flyplasser.geojson",
    format: new GeoJSON(),
  }),
});
