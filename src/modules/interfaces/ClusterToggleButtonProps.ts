import React from "react";

export interface ClusterToggleButtonProps {
  useClustering: boolean;
  setUseClustering: React.Dispatch<React.SetStateAction<boolean>>;
}
