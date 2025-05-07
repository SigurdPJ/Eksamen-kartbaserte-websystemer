import React from "react";
import AirportProps from "../interfaces/AirportProps";

const AirportOverlay = ({ features }: { features: AirportProps[] }) => {
  if (features.length >= 1) {
    const airport = features[0];

    return (
      <div className={"overlayDiv"}>
        <h3>Flyplassinfo</h3>
        <p>
          <strong>Flyplassnavn:</strong> {airport.navn}
        </p>
        {airport.alt_navn && (
          <p>
            <strong>Alternativt navn:</strong> {airport.alt_navn}
          </p>
        )}
      </div>
    );
  }
  return <div></div>;
};

export default AirportOverlay;
