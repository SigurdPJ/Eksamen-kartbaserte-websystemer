import React from "react";
import { VectorLayerToggleProps } from "../interfaces/VectorLayerToggleProps";

export function ShowAirportsToggle({ show, setShow }: VectorLayerToggleProps) {
  return (
    <button className="sidebar-button" onClick={() => setShow((prev) => !prev)}>
      {show ? "Hide Airports" : "Show Airports"}
    </button>
  );
}
