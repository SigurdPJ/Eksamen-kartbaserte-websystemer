import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";

export const osmLayer = new TileLayer({
  source: new OSM(),
});
