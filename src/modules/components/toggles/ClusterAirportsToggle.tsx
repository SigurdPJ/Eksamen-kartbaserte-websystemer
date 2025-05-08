import React from "react";
import { ClusterToggleButtonProps } from "../../interfaces/ClusterToggleButtonProps";

export function ClusterAirportsToggle({
  useClustering,
  setUseClustering,
}: ClusterToggleButtonProps) {
  return (
    <div className="cluster-container">
      <label className="cluster-label">
        Cluster flyplasser:
        <input
          type="checkbox"
          checked={useClustering}
          onChange={() => setUseClustering((prev) => !prev)}
          className="form-checkbox"
        />
      </label>
    </div>
  );
}
