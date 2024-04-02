// import React, { useState, useEffect } from "react";
// import "./Timer.css";
// import dingSound from "./ding-ding-ding.mp3";
// import TimerDisplay from "./TimerDisplay";
// import TimerSaveLink from "./TimerSave";
// import TimerControls from "./TimerControls";

// // Constantes
// const DEFAULT_TIMES_KEY = "defaultTimes";
// const DEFAULT_TIMES = {
//   Focus: 10, // 25 minutes
//   "Short Break": 100, // 5 minutes
//   "Long Break": 900, // 15 minutes
// };

// // Composant Timer
// export default function Timer({ sessionType = "Focus" }) {
//   // États
//   const [time, setTime] = useState(() => {
//     const storedDefaultTimes =
//       JSON.parse(localStorage.getItem(DEFAULT_TIMES_KEY)) || {};
//     return storedDefaultTimes[sessionType] || DEFAULT_TIMES[sessionType];
//   });
//   const [timerActive, setTimerActive] = useState(false);
//   const [soundOn, setSoundOn] = useState(true);
//   const [showSaveLink, setShowSaveLink] = useState(false);
//   const [timerResumed, setTimerResumed] = useState(false);
//   const [timerEnded, setTimerEnded] = useState(false);
//   const [sessionCount, setSessionCount] = useState(0);

//   // Fonctions utilitaires
//   const toggleSound = () => {
//     setSoundOn((prevSoundOn) => !prevSoundOn);
//   };

//   const resetTimer = () => {
//     const storedDefaultTimes =
//       JSON.parse(localStorage.getItem(DEFAULT_TIMES_KEY)) || {};
//     const defaultTime =
//       storedDefaultTimes[sessionType] || DEFAULT_TIMES[sessionType];
//     setTime(defaultTime);
//     saveNewDefaultTime(defaultTime);
//   };

//   const incrementTime = () => {
//     const newTime = Math.round((time + 60) / 60) * 60;
//     setTime(newTime);
//     setShowSaveLink(true);
//   };

//   const decrementTime = () => {
//     if (time > 60) {
//       const newTime = Math.round((time - 60) / 60) * 60;
//       setTime(newTime);
//       setShowSaveLink(true);
//     }
//   };

//   const saveNewDefaultTime = (newTime) => {
//     const storedDefaultTimes =
//       JSON.parse(localStorage.getItem(DEFAULT_TIMES_KEY)) || {};
//     const updatedDefaultTimes = {
//       ...storedDefaultTimes,
//       [sessionType]: newTime,
//     };
//     localStorage.setItem(
//       DEFAULT_TIMES_KEY,
//       JSON.stringify(updatedDefaultTimes)
//     );
//     setShowSaveLink(false);
//   };

//   // Gestion des effets
//   useEffect(() => {
//     let interval;

//     if (timerActive && time > 0) {
//       interval = setInterval(() => {
//         setTime((prevTime) => prevTime - 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//       if (time === 0) {
//         if (soundOn) {
//           const audio = new Audio(dingSound);
//           audio.play();
//         }
//         setTimerEnded(true);
//       }
//     }

//     return () => clearInterval(interval);
//   }, [timerActive, time, soundOn]);

//   useEffect(() => {
//     if (timerEnded) {
//       setSessionCount((prevCount) => prevCount + 1);
//     }
//   }, [timerEnded]);

//   useEffect(() => {
//     if (!timerActive && timerEnded) {
//       setSessionCount((prevCount) => prevCount + 1);
//     }
//   }, [timerActive, timerEnded]);

//   useEffect(() => {
//     setTime(() => {
//       const storedDefaultTimes =
//         JSON.parse(localStorage.getItem(DEFAULT_TIMES_KEY)) || {};
//       return storedDefaultTimes[sessionType] || DEFAULT_TIMES[sessionType];
//     });
//   }, [sessionType]);

//   useEffect(() => {
//     setShowSaveLink(sessionType === "Focus");
//   }, [sessionType]);

//   // Rendu du composant
//   return (
//     <div className="Timer">
//       <TimerControls
//         soundOn={soundOn}
//         toggleSound={toggleSound}
//         timerActive={timerActive}
//         toggleTimer={toggleTimer}
//         resetTimer={resetTimer}
//         onTimerEnd={() => setTimerEnded(true)}
//       />
//       <TimerDisplay
//         time={time}
//         decrementTime={decrementTime}
//         incrementTime={incrementTime}
//         timerResumed={timerResumed}
//       />
//       <TimerSaveLink
//         showSaveLink={showSaveLink}
//         saveNewDefaultTime={saveNewDefaultTime}
//         time={time}
//       />
//       {timerEnded && <p>Well done!</p>}
//       <p>Sessions lancées : {sessionCount}</p>
//     </div>
//   );
// }

// Timer.js
import React, { useState, useEffect } from "react";
import TimerControls from "./TimerControls";
import TimerDisplay from "./TimerDisplay";
import ChangeTimer from "./ChangeTimer"; // Changed import name
import "./Timer.css";

const Timer = () => {
  const [timer, setTimer] = useState(1500);
  const [isWorking, setIsWorking] = useState(true);
  const [workSessions, setWorkSessions] = useState(0);
  const [sessionEmojis, setSessionEmojis] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      if (timer > 0) {
        intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      } else {
        if (isWorking) {
          setWorkSessions((prevSessions) => prevSessions + 1);
          if (workSessions === 3) {
            setIsWorking(false);
            setWorkSessions(0);
            setTimer(300);
          } else {
            setTimer(1500);
            setSessionEmojis((prevEmojis) => [...prevEmojis, "👩‍💻"]);
            setIsRunning(false);
          }
        } else {
          setIsWorking(true);
          setTimer(1500);
          setSessionEmojis((prevEmojis) => [...prevEmojis, "☕"]);
          setIsRunning(false);
        }
      }
    }

    return () => clearInterval(intervalId);
  }, [timer, isWorking, isRunning, workSessions]);

  const toggleTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(1500);
    setIsWorking(true);
    setWorkSessions(0);
    setSessionEmojis([]);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (isWorking) {
      setWorkSessions((prevSessions) => prevSessions + 1);
      if (workSessions === 3) {
        setIsWorking(false);
        setWorkSessions(0);
        setTimer(300);
      } else {
        setTimer(1500);
        setSessionEmojis((prevEmojis) => [...prevEmojis, "👩‍💻"]);
      }
    } else {
      setIsWorking(true);
      setTimer(1500);
      setSessionEmojis((prevEmojis) => [...prevEmojis, "☕"]);
    }
  };

  const changeTimer = (newTime) => {
    setIsRunning(false);
    setTimer(newTime);
    setIsWorking(true);
    setWorkSessions(0);
    setSessionEmojis([]);
  };

  return (
    <div className="Timer">
      <ChangeTimer changeTimer={changeTimer} />
      <div className="Pomodoto-timer">
        <TimerControls
          isRunning={isRunning}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
          stopTimer={stopTimer}
        />
        <TimerDisplay timer={timer} sessionEmojis={sessionEmojis} />
      </div>
    </div>
  );
};

export default Timer;
