import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export const measurementSource = new VectorSource();

export const measurementLayer = new VectorLayer({
  source: measurementSource,
  projection: "EPSG:4326",
} as any);
