// import React from "react";
// import {
//   FaPlay,
//   FaPause,
//   FaRedo,
//   FaVolumeUp,
//   FaVolumeMute,
// } from "react-icons/fa";

// export default function TimerControls({
//   soundOn,
//   toggleSound,
//   timerActive,
//   toggleTimer,
//   resetTimer,
//   onTimerEnd, // Fonction pour gérer la fin du timer
// }) {
//   const handleToggleTimer = () => {
//     toggleTimer();
//     if (!timerActive) {
//       onTimerEnd(); // Appel de la fonction de gestion de la fin du timer lorsque le timer est relancé
//     }
//   };

//   return (
//     <div className="timer-buttons">
//       <button
//         title="Turn Ding! on or off"
//         className="sound-icon"
//         onClick={toggleSound}
//       >
//         {soundOn ? <FaVolumeUp /> : <FaVolumeMute />}
//       </button>
//       <button className="playpause-icon" onClick={handleToggleTimer}>
//         {timerActive ? <FaPause /> : <FaPlay />}
//       </button>
//       <button title="Reload Timer" className="reset-icon" onClick={resetTimer}>
//         <FaRedo />
//       </button>
//     </div>
//   );
// }
// TimerControls.js

import React from "react";
import {
  FaPlay,
  FaPause,
  FaRedo,
  // FaVolumeUp,
  // FaVolumeMute,
  FaStop,
} from "react-icons/fa";

const TimerControls = ({ isRunning, toggleTimer, resetTimer, stopTimer }) => {
  return (
    <div className="Timer-Controls">
      <button onClick={toggleTimer}>
        {isRunning ? <FaPause /> : <FaPlay />}
      </button>
      <button onClick={resetTimer}>
        <FaRedo />
      </button>
      <button onClick={stopTimer}>
        <FaStop />
      </button>
    </div>
  );
};

export default TimerControls;
