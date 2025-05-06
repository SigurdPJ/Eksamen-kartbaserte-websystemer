import { Map } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

export interface DrawingControlsProps {
  map: Map | null;
  vectorSource: VectorSource;
  vectorLayer: VectorLayer;
  activeTool: "draw" | "measure" | null;
  setActiveTool: (tool: "draw" | "measure" | null) => void;
}
