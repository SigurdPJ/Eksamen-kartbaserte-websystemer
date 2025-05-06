import { useMemo } from "react";
import TileLayer from "ol/layer/Tile";
import { StadiaMaps } from "ol/source";

export const stadiaDarkLayer = new TileLayer({
  source: new StadiaMaps({ layer: "alidade_smooth_dark" }),
});
