import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export const iconSource = new VectorSource();

export const iconLayer = new VectorLayer({
  source: iconSource,
});
