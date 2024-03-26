import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      setIsBreak(!isBreak);
      if (isBreak) {
        setTime(300); // 5 minutes break
      } else {
        setTime(2700); // 45 minutes long break
      }
    }
    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(1500); // Reset to 25 minutes
  };

  return (
    <div>
      <div>
        <h1>{isBreak ? "Break" : "Focus"}</h1>
        <h1>
          {Math.floor(time / 60)}:
          {time % 60 < 10 ? "0" + (time % 60) : time % 60}
        </h1>
      </div>
      <div>
        <button onClick={startTimer} disabled={isActive}>
          Focus (25 min)
        </button>
        <button onClick={() => setTime(300)} disabled={isActive}>
          Short Break (5 min)
        </button>
        <button onClick={() => setTime(2700)} disabled={isActive}>
          Long Break (45 min)
        </button>
        <button onClick={resetTimer} disabled={!isActive && time === 1500}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
