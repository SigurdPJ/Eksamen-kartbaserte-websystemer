import { Map } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

export interface ControlsProps {
  map: Map | null;
  vectorSource: VectorSource;
  vectorLayer: VectorLayer;
  activeTool: "draw" | "icon" | null;
  setActiveTool: (tool: "draw" | "icon" | null) => void;
}
