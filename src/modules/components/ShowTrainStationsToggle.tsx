import React from "react";
import { VectorLayerToggleProps } from "../interfaces/VectorLayerToggleProps";

export function ShowTrainStationsToggle({
  show,
  setShow,
}: VectorLayerToggleProps) {
  return (
    <button className="sidebar-button" onClick={() => setShow((prev) => !prev)}>
      {show ? "Hide train stations" : "Show train stations"}
    </button>
  );
}
