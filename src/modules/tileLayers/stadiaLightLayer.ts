import TileLayer from "ol/layer/Tile";
import { StadiaMaps } from "ol/source";

export const stadiaLightLayer = new TileLayer({
  source: new StadiaMaps({ layer: "alidade_smooth" }),
});
