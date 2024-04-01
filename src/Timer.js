import React, { useState, useEffect } from "react";
import "./Timer.css";
import dingSound from "./ding-ding-ding.mp3";
import TimerDisplay from "./TimerDisplay";
import TimerSaveLink from "./TimerSave";
import TimerControls from "./TimerControls";

const DEFAULT_TIMES_KEY = "defaultTimes";
const DEFAULT_TIMES = {
  Focus: 1500, // 25 minutes
  "Short Break": 100, // 5 minutes
  "Long Break": 900, // 15 minutes
};

export default function Timer({ sessionType = "Focus" }) {
  const [time, setTime] = useState(() => {
    const storedDefaultTimes =
      JSON.parse(localStorage.getItem(DEFAULT_TIMES_KEY)) || {};
    return storedDefaultTimes[sessionType] || DEFAULT_TIMES[sessionType];
  });
  const [timerActive, setTimerActive] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [showSaveLink, setShowSaveLink] = useState(false);
  const [timerResumed, setTimerResumed] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(
    parseInt(localStorage.getItem("completedSessions")) || 0
  );

  useEffect(() => {
    let interval;

    if (timerActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (time === 0) {
        setCompletedSessions((prevSessions) => {
          const newSessions = prevSessions + 1;
          localStorage.setItem("completedSessions", newSessions);
          return newSessions;
        });
        if (soundOn) {
          const audio = new Audio(dingSound);
          audio.play();
        }
      }
    }

    return () => clearInterval(interval);
  }, [timerActive, time, soundOn, completedSessions]);

  useEffect(() => {
    setTime(() => {
      const storedDefaultTimes =
        JSON.parse(localStorage.getItem(DEFAULT_TIMES_KEY)) || {};
      return storedDefaultTimes[sessionType] || DEFAULT_TIMES[sessionType];
    });
  }, [sessionType]);

  useEffect(() => {
    if (sessionType === "Focus") {
      setShowSaveLink(true);
    } else {
      setShowSaveLink(false);
    }
  }, [sessionType]);

  const toggleTimer = () => {
    setTimerActive((prevActive) => !prevActive);
    setTimerResumed(true);
  };

  const toggleSound = () => {
    setSoundOn((prevSoundOn) => !prevSoundOn);
  };

  const resetTimer = () => {
    const storedDefaultTimes =
      JSON.parse(localStorage.getItem(DEFAULT_TIMES_KEY)) || {};
    const defaultTime =
      storedDefaultTimes[sessionType] || DEFAULT_TIMES[sessionType];
    setTime(defaultTime);
    saveNewDefaultTime(defaultTime);
  };

  const incrementTime = () => {
    const newTime = Math.round((time + 60) / 60) * 60;
    setTime(newTime);
    setShowSaveLink(true);
  };

  const decrementTime = () => {
    if (time > 60) {
      const newTime = Math.round((time - 60) / 60) * 60;
      setTime(newTime);
      setShowSaveLink(true);
    }
  };

  const saveNewDefaultTime = (newTime) => {
    const storedDefaultTimes =
      JSON.parse(localStorage.getItem(DEFAULT_TIMES_KEY)) || {};
    const updatedDefaultTimes = {
      ...storedDefaultTimes,
      [sessionType]: newTime,
    };
    localStorage.setItem(
      DEFAULT_TIMES_KEY,
      JSON.stringify(updatedDefaultTimes)
    );
    setShowSaveLink(false);
  };

  return (
    <div className="Timer">
      <TimerControls
        soundOn={soundOn}
        toggleSound={toggleSound}
        timerActive={timerActive}
        toggleTimer={toggleTimer}
        resetTimer={resetTimer}
      />
      <TimerDisplay
        time={time}
        decrementTime={decrementTime}
        incrementTime={incrementTime}
        timerResumed={timerResumed}
      />
      <TimerSaveLink
        showSaveLink={showSaveLink}
        saveNewDefaultTime={saveNewDefaultTime}
        time={time}
      />
    </div>
  );
}
