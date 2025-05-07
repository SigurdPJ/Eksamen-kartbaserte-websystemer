import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

export async function culturalHeritageLayer() {
  const response = await fetch("/api/culturalheritage");
  const data = await response.json();

  const geojsonFormat = new GeoJSON();
  const features = geojsonFormat.readFeatures(data);

  return new VectorLayer({
    source: new VectorSource({
      features,
    }),
  });
}
