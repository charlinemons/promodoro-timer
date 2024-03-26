import React, { useState } from "react";
import Timer from "./Timer";
import SessionButtons from "./Buttons";
import Modal from "./Modal";

import "./App.css";
import "./Timer.css";

const DEFAULT_SESSION_TYPE = "Focus";

export default function App() {
  const [sessionType, setSessionType] = useState(DEFAULT_SESSION_TYPE);
  const [showModal, setShowModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#734f9a"); // Default background color

  const handleSessionChange = (type) => {
    setSessionType(type);
    // Set background color based on session type
    switch (type) {
      case "Short Break":
        setBackgroundColor("#8bd450"); // Change to your desired color for short break
        break;
      case "Long Break":
        setBackgroundColor("#3f6d4e"); // Change to your desired color for long break
        break;
      case "Focus":
        setBackgroundColor("#965fd4"); // Change to your desired color for focus session
        break;
      default:
        setBackgroundColor("#965fd4"); // Default color
    }
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

  return (
    <div className="App" style={{ backgroundColor }}>
      <SessionButtons handleSessionChange={handleSessionChange} />
      <div className="container">
        <Timer sessionType={sessionType} />
      </div>
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
    </div>
  );
}
