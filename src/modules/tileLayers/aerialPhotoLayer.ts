import TileLayer from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";
import WMTSCapabilities from "ol/format/WMTSCapabilities";
import { optionsFromCapabilities } from "ol/source/WMTS";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";

proj4.defs([
  [
    "EPSG:25833",
    "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs",
  ],
]);
register(proj4);

export const aerialPhotoLayer = new TileLayer();

const parser = new WMTSCapabilities();
fetch(
  "http://opencache.statkart.no/gatekeeper/gk/gk.open_nib_utm33_wmts_v2?SERVICE=WMTS&REQUEST=GetCapabilities",
)
  .then((response) => response.text())
  .then((text) => {
    const result = parser.read(text);
    const options = optionsFromCapabilities(result, {
      layer: "Nibcache_UTM33_EUREF89_v2",
      matrixSet: "default028mm",
    });
    if (options) {
      aerialPhotoLayer.setSource(new WMTS(options));
    }
  })
  .catch(console.error);
