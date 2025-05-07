import React from "react";

interface ShowTrainlinesToggleProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ShowTrainLinesToggle({
  show,
  setShow,
}: ShowTrainlinesToggleProps) {
  return (
    <button onClick={() => setShow((prev) => !prev)}>
      {show ? "Hide Train Lines" : "Show Train Lines"}
    </button>
  );
}
