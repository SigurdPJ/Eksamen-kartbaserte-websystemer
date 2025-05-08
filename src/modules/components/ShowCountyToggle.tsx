import React from "react";

interface ShowCountyToggleProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ShowCountyToggle({ show, setShow }: ShowCountyToggleProps) {
  return (
    <button className="sidebar-button" onClick={() => setShow((prev) => !prev)}>
      {show ? "Gjem fylkesgrenser" : "Vis fylkesgrenser"}
    </button>
  );
}
