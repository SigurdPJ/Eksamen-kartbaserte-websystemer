import React from "react";

interface ClusterToggleButtonProps {
  useClustering: boolean;
  setUseClustering: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ClusterStationsToggle({
  useClustering,
  setUseClustering,
}: ClusterToggleButtonProps) {
  return (
    <label className="cursor-pointer">
      Cluster togstasjoner:
      <input
        type="checkbox"
        checked={useClustering}
        onChange={() => setUseClustering((prev) => !prev)}
        className="form-checkbox"
      />
    </label>
  );
}
