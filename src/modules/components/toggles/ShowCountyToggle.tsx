import React from "react";
import { VectorLayerToggleProps } from "../../interfaces/VectorLayerToggleProps";

export function ShowCountyToggle({ show, setShow }: VectorLayerToggleProps) {
  return (
    <button className="sidebar-button" onClick={() => setShow((prev) => !prev)}>
      {show ? "Gjem fylkesgrenser" : "Vis fylkesgrenser"}
    </button>
  );
}
