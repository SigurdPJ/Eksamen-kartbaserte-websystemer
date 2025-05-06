import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Stroke, Style } from "ol/style";

export const trainStationLayer = new VectorLayer({
  source: new VectorSource({
    url: "geojson/jernbanestasjoner.geojson",
    format: new GeoJSON(),
  }),
});
