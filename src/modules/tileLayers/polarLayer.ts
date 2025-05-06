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
  [
    "EPSG:3575",
    "+proj=laea +lat_0=90 +lon_0=10 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs",
  ],
]);
register(proj4);

export const polarLayer = new TileLayer();

const parser = new WMTSCapabilities();
fetch("/wmts/arctic-sdi.xml")
  .then(async (response) => {
    const result = parser.read(await response.text());
    const options = optionsFromCapabilities(result, {
      layer: "arctic_cascading",
      matrixSet: "3575",
    });
    if (options) {
      polarLayer.setSource(new WMTS(options));
    }
  })
  .catch(console.error);
