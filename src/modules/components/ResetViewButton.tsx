import React from "react";
import { View } from "ol";

interface ResetButtonProps {
  view: View;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ view }) => {
  const handleClick = () => {
    view.animate({
      center: [17, 65.4],
      zoom: 4.8,
      duration: 1500,
    });
  };

  return (
    <button className="sidebar-button" onClick={handleClick}>
      Zoom ut
    </button>
  );
};
