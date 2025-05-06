import React from "react";

import AirportProperties from "../interfaces/AirportProperties";

const AirportOverlay = ({ features }: { features: AirportProperties[] }) => {
  if (features.length >= 1) {
    return (
      <div className={"overlayDiv"}>
        <h3>Flyplassinfo</h3>
        <p>
          <strong>Flyplassnavn:</strong> {features[0].navn}
        </p>
        <p>
          <strong>Alternativt navn:</strong> {features[0].alt_navn}
        </p>
      </div>
    );
  }
  return <div></div>;
};

export default AirportOverlay;
