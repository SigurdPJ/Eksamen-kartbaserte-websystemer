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
    <button onClick={() => setUseClustering((prev) => !prev)}>
      {useClustering ? "Turn of clusters" : "Cluster"}
    </button>
  );
}
