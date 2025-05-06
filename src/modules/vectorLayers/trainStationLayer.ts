import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Stroke, Style } from "ol/style";

export const trainStationLayer = new VectorLayer({
  source: new VectorSource({
    url: "geojson/jernbanestasjoner-N50.geojson",
    format: new GeoJSON(),
  }),
  style: new Style({
    stroke: new Stroke({
      color: "white",
      width: 2,
    }),
  }),
});
