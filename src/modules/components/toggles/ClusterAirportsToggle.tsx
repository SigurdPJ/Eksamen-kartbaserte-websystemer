import React from "react";
import { ClusterToggleButtonProps } from "../../interfaces/ClusterToggleButtonProps";

export function ClusterAirportsToggle({
  useClustering,
  setUseClustering,
}: ClusterToggleButtonProps) {
  return (
    <label className="cursor-pointer">
      Cluster flyplasser:
      <input
        type="checkbox"
        checked={useClustering}
        onChange={() => setUseClustering((prev) => !prev)}
        className="form-checkbox"
      />
    </label>
  );
}
