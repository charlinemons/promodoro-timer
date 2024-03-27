import React, { useState, useEffect } from "react";
import "./Timer.css";
import dingSound from "./ding-ding-ding.mp3";
import TimerDisplay from "./TimerDisplay";
import TimerSaveLink from "./TimerSave";
import TimerControls from "./TimerControls";

const DEFAULT_TIMES_KEY = "defaultTimes";
const DEFAULT_TIMES = {
  Focus: 1500, // 25 minutes
  "Short Break": 300, // 5 minutes
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

  useEffect(() => {
    let interval;

    if (timerActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (time === 0) {
        if (soundOn) {
          const audio = new Audio(dingSound);
          audio.play();
        }
        let dynamicTitle = false;
        interval = setInterval(() => {
          dynamicTitle = !dynamicTitle;
          document.title = dynamicTitle
            ? "⌛ Session completed!"
            : "✅ Click OK to start your next session";
        }, 1000);
        setTimeout(() => {
          if (document.hasFocus()) {
            alert(
              "⌛ Session completed!\n\n✅ Click OK to start your next session."
            );
            window.location.reload();
          } else {
            const reloadPage = () => {
              if (document.hasFocus()) {
                alert(
                  "⌛ Session completed!\n\n✅ Click OK to start your next session."
                );
                window.removeEventListener("focus", reloadPage);
                window.location.reload();
              }
            };
            window.addEventListener("focus", reloadPage);
          }
        }, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [timerActive, time, soundOn]);

  useEffect(() => {
    setTime(() => {
      const storedDefaultTimes =
        JSON.parse(localStorage.getItem(DEFAULT_TIMES_KEY)) || {};
      return storedDefaultTimes[sessionType] || DEFAULT_TIMES[sessionType];
    });
  }, [sessionType]);

  const toggleTimer = () => {
    setTimerActive((prevActive) => !prevActive);
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
  // both rounded to the nearest minute to avoid fractional minutes

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
      <TimerDisplay
        time={time}
        decrementTime={decrementTime}
        incrementTime={incrementTime}
      />
      <h2 className="stay-focus">Stay focus.</h2>
      <TimerSaveLink
        showSaveLink={showSaveLink}
        saveNewDefaultTime={saveNewDefaultTime}
        time={time}
      />
      <TimerControls
        soundOn={soundOn}
        toggleSound={toggleSound}
        timerActive={timerActive}
        toggleTimer={toggleTimer}
        resetTimer={resetTimer}
      />
    </div>
  );
}
