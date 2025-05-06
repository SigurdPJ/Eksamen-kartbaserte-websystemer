import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export const drawingSource = new VectorSource();

export const drawingLayer = new VectorLayer({
  source: drawingSource,
});
