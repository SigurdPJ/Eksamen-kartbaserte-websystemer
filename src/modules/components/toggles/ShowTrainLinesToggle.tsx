import React from "react";
import { VectorLayerToggleProps } from "../../interfaces/VectorLayerToggleProps";

export function ShowTrainLinesToggle({
  show,
  setShow,
}: VectorLayerToggleProps) {
  return (
    <button className="sidebar-button" onClick={() => setShow((prev) => !prev)}>
      {show ? "Hide Train Lines" : "Show Train Lines"}
    </button>
  );
}
