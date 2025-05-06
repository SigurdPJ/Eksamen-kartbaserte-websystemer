import { Map } from "ol";
import VectorSource from "ol/source/Vector";

export interface MeasurementControlsProps {
  map: Map | null;
  source: VectorSource;
  activeTool: "draw" | "measure" | null;
  setActiveTool: (tool: "draw" | "measure" | null) => void;
}
