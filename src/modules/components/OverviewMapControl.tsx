import { useEffect } from "react";
import OverviewMap from "ol/control/OverviewMap";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Map } from "ol";

interface OverviewMapControlProps {
  map: Map | null;
  collapsed?: boolean;
}

export const OverviewMapControl = ({
  map,
  collapsed = true,
}: OverviewMapControlProps) => {
  useEffect(() => {
    if (!map) return;

    const overviewMapControl = new OverviewMap({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      collapseLabel: "»",
      label: "«",
      collapsed,
    });

    map.addControl(overviewMapControl);

    return () => {
      map.removeControl(overviewMapControl);
    };
  }, [map, collapsed]);

  return null;
};
