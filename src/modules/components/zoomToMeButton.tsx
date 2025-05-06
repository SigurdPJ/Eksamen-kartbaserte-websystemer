import React from "react";
import { View } from "ol";

interface ZoomToMeButtonProps {
  view: View;
}

export const ZoomToMeButton: React.FC<ZoomToMeButtonProps> = ({ view }) => {
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        view.animate({
          center: [longitude, latitude],
          zoom: 11,
          duration: 1500,
        });
      },
      (error) => {
        alert(error.message);
      },
    );
  };

  return <button onClick={handleClick}>zoom to me</button>;
};
