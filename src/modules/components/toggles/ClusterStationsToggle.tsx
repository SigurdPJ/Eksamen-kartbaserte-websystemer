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
    <button
      className="sidebar-button"
      onClick={() => setUseClustering((prev) => !prev)}
    >
      {useClustering ? "Unclusters train stations" : "Cluster train stations"}
    </button>
  );
}
