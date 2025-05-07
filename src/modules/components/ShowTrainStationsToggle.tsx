import React from "react";

interface ShowTrainStationsToggleProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ShowTrainStationsToggle({
  show,
  setShow,
}: ShowTrainStationsToggleProps) {
  return (
    <button onClick={() => setShow((prev) => !prev)}>
      {show ? "Hide train stations" : "Show train stations"}
    </button>
  );
}
