// export default function TimerDisplay({ time }) {
//   console.log("Time prop in TimerDisplay:", time);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return { minutes, remainingSeconds };
//   };

//   const { minutes, remainingSeconds } = formatTime(time);

//   return (
//     <div className="timer-display">
//       <h1>
//         {minutes < 10 ? "0" + minutes : minutes}:
//         {remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}
//       </h1>
//     </div>
//   );
// }

// import React from "react";

// const TimerDisplay = ({ timer, sessionEmojis }) => {
//   // Formatage du temps restant en secondes
//   const formatTime = (timeInSeconds) => {
//     return `${timeInSeconds.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div className="timer-display">
//       {formatTime(timer)}{" "}
//       {sessionEmojis.map((emoji, index) => (
//         <span key={index}>{emoji}</span>
//       ))}
//     </div>
//   );
// };

// export default TimerDisplay;
import React from "react";

const TimerDisplay = ({ timer, sessionEmojis }) => {
  const maxSessions = 4;
  const completedSessions = Math.min(sessionEmojis.length, maxSessions);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const renderSessionIcons = () => {
    const sessionIcons = Array.from({ length: maxSessions }, (_, index) => (
      <div
        key={index}
        className={`session-icon ${
          index < completedSessions ? "completed" : ""
        }`}
      ></div>
    ));

    // Si le nombre de sessions complétées est supérieur ou égal à 4, afficher la phrase "Take a break"
    if (completedSessions >= maxSessions) {
      sessionIcons.push(<div key={maxSessions}>Take a break</div>);
    }

    return sessionIcons;
  };

  return (
    <div className="timer-display">
      <h1 className="timer">{formatTime(timer)}</h1>
      <div className="session-icons">{renderSessionIcons()}</div>
    </div>
  );
};

export default TimerDisplay;
