import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import MVT from "ol/format/MVT";

const token =
  "pk.eyJ1Ijoic2lnZ3VyZGQiLCJhIjoiY21hOWo0ZjM4MWZ0YjJrcXVndmN5a2IxMSJ9.3_o91zZHNHyjrl7zxXnBrg";

export const mapboxLayer = new VectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url: `https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}.vector.pbf?access_token=${token}`,
    projection: "EPSG:3857",
  }),
});
