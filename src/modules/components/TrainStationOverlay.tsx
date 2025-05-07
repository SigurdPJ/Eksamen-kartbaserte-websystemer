import React from "react";

import TrainStationProps from "../interfaces/TrainStationProps";

const TrainStationOverlay = ({
  features,
}: {
  features: TrainStationProps[];
}) => {
  if (features.length >= 1) {
    return (
      <div className={"overlayDiv"}>
        <h3>Togstasjon</h3>
        <p>
          <strong>Stasjonsnavn :</strong> {features[0].navn}
        </p>
      </div>
    );
  }
  return <div></div>;
};

export default TrainStationOverlay;
