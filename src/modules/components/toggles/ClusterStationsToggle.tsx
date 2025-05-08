import React from "react";
import { ClusterToggleButtonProps } from "../../interfaces/ClusterToggleButtonProps";

export function ClusterStationsToggle({
  useClustering,
  setUseClustering,
}: ClusterToggleButtonProps) {
  return (
    <div className="cluster-container">
      <label className="cluster-label">
        Cluster togstasjoner:
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
