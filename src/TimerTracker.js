import React from "react";

export default function TimerTracker({ count }) {
  // Déterminez combien de points doivent être affichés
  const numPoints = Math.floor(count / 4);

  // Créez un tableau pour stocker les éléments JSX de points
  const points = Array(numPoints)
    .fill()
    .map((_, index) => <div key={index} className="tracker-point"></div>);

  return <div className="timer-tracker">{points}</div>;
}
