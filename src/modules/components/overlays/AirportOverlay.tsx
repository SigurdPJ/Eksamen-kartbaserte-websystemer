import React from "react";

interface AirportProps {
  navn: string;
  alt_navn: string;
}

const AirportOverlay = ({ features }: { features: AirportProps[] }) => {
  if (features.length >= 1) {
    const airport = features[0];

    return (
      <div className={"overlayDiv"}>
        <img
          src="/icons/fluent-emoji--airplane.png"
          alt="Plane icon"
          className="overlayIcon"
        />
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
