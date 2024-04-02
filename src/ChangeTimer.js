import React from "react";
import "./ChangeTimer.css";

const ChangeTimer = ({ changeTimer }) => {
  return (
    <div className="ChangeTimer">
      <button onClick={() => changeTimer(300)}>Short break</button>
      <button onClick={() => changeTimer(900)}>Long break</button>
      <button onClick={() => changeTimer(1500)}>Focus</button>
    </div>
  );
};

export default ChangeTimer;
