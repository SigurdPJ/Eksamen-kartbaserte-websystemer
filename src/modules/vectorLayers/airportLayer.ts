import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Cluster from "ol/source/Cluster";
import { GeoJSON } from "ol/format";
import { Style, Fill, Text, Icon } from "ol/style";
import { FeatureLike } from "ol/Feature";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import Geometry from "ol/geom/Geometry";
import MultiPoint from "ol/geom/MultiPoint";

const geometryFunction = (feature: Feature<Geometry>): Point | null => {
  const geometry = feature.getGeometry();

  if (!geometry) return null;

  switch (geometry.getType()) {
    case "Point":
      return geometry as Point;
    case "MultiPoint":
      const multiPoint = geometry as MultiPoint;
      const coordinates = multiPoint.getCoordinates();
      return coordinates.length > 0 ? new Point(coordinates[0]) : null;
    default:
      return null;
  }
};

const airportSource = new VectorSource({
  url: "geojson/flyplasser.geojson",
  format: new GeoJSON(),
});

const airplaneIconStyle = new Style({
  image: new Icon({
    src: "/icons/fluent-emoji--airplane.png",
    scale: 0.5,
    anchor: [0.5, 1],
  }),
});

export const airportLayer = new VectorLayer({
  source: new VectorSource({
    url: "geojson/flyplasser.geojson",
    format: new GeoJSON(),
  }),
  style: airplaneIconStyle,
});

const clusterSource = new Cluster({
  distance: 40,
  minDistance: 20,
  source: airportSource,
  geometryFunction: geometryFunction,
});

const styleCache: Record<number, Style> = {};

const clusterStyle = (feature: FeatureLike) => {
  const features = feature.get("features");
  const size = features.length;

  if (size > 1) {
    if (!styleCache[size]) {
      styleCache[size] = new Style({
        image: new Icon({
          src: "/icons/fluent-emoji--airplane.png",
          scale: 0.5,
          anchor: [0.5, 1],
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({ color: "black" }),
          font: "16px Arial",
          offsetY: 8,
        }),
      });
    }
    return styleCache[size];
  }

  const singleFeature = features[0];
  const utland = singleFeature.get("utland");
  const hasInternationalFlights = utland > 0;

  return new Style({
    image: new Icon({
      src: hasInternationalFlights
        ? "/icons/fluent-emoji--world-map.png"
        : "/icons/fluent-emoji--airplane.png",
      scale: 0.5,
      anchor: [0.5, 1],
    }),
    text: hasInternationalFlights
      ? new Text({
          text: "Internasjonal",
          fill: new Fill({ color: "black" }),
          font: " 14px Arial",
          offsetY: 10,
          textAlign: "center",
        })
      : undefined,
  });
};

export const airportLayerClustered = new VectorLayer({
  source: clusterSource,
  style: clusterStyle,
});
