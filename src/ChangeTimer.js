import React, { useState } from "react";
import "./ChangeTimer.css";

const ChangeTimer = ({ changeTimer }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (timer) => {
    changeTimer(timer);
    setSelectedButton(timer);
  };

  return (
    <div className="ChangeTimer">
      <button
        className={
          selectedButton === 300
            ? "changeTimerButton active"
            : "changeTimerButton"
        }
        onClick={() => handleButtonClick(300)}
      >
        Short break
      </button>
      <button
        className={
          selectedButton === 900
            ? "changeTimerButton active"
            : "changeTimerButton"
        }
        onClick={() => handleButtonClick(900)}
      >
        Long break
      </button>
      <button
        className={
          selectedButton === 1500
            ? "changeTimerButton active"
            : "changeTimerButton"
        }
        onClick={() => handleButtonClick(1500)}
      >
        Focus
      </button>
    </div>
  );
};

export default ChangeTimer;
