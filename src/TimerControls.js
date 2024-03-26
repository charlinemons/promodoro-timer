import React from "react";
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

export default function TimerControls({
  soundOn,
  toggleSound,
  timerActive,
  toggleTimer,
  resetTimer,
}) {
  return (
    <div className="timer-buttons">
      <button
        title="Turn Ding! on or off"
        className="sound-icon"
        onClick={toggleSound}
      >
        {soundOn ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>
      <button className="playpause-icon" onClick={toggleTimer}>
        {timerActive ? <FaPause /> : <FaPlay />}
      </button>
      <button title="Reload Timer" className="reset-icon" onClick={resetTimer}>
        <FaRedo />
      </button>
    </div>
  );
}
