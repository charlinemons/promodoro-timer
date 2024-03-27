import React, { useState } from "react";
import Timer from "./Timer";
import Header from "./Header";
import SessionButtons from "./Buttons";
import Modal from "./Modal";

import "./App.css";
import "./Timer.css";

const DEFAULT_SESSION_TYPE = "Focus";

export default function App() {
  const [sessionType, setSessionType] = useState(DEFAULT_SESSION_TYPE);
  const [showModal, setShowModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#EFEEEB"); // Set your desired background color here

  const handleSessionChange = (type) => {
    setSessionType(type);
  };

  const restoreDefaultSettings = () => {
    const confirmed = window.confirm(
      "🍅 Please confirm settings restoration 🍅\n\nAre you sure you want to restore all settings to their default values?\n\n🕒 Focus time: 25 minutes\n🍃 Short break: 5 minutes\n🌿 Long break: 30 minutes"
    );
    if (confirmed) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const changeBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="App" style={{ backgroundColor }}>
      <div className="container">
        <Header />
        <SessionButtons handleSessionChange={handleSessionChange} />
        <Timer sessionType={sessionType} />
      </div>
    </div>
  );
}
{
  /* 
      
      

      <Modal showModal={showModal} closeModal={closeModal} />

      <div className="footer">
        <div className="pomodoro-info">
          <button onClick={openModal}>About this app</button>
        </div>
        |
        <div className="restore-default-settings">
          <button onClick={restoreDefaultSettings}>Reset settings</button>
        </div>
      </div>
    </div> */
}
