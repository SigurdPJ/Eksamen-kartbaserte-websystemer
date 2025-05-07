import React from "react";

interface ShowAirportsToggleProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ShowAirportsToggle({ show, setShow }: ShowAirportsToggleProps) {
  return (
    <button className="sidebar-button" onClick={() => setShow((prev) => !prev)}>
      {show ? "Hide Airports" : "Show Airports"}
    </button>
  );
}
