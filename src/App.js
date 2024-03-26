import React, { useState } from "react";
import Timer from "./Timer";
import SessionButtons from "./Buttons";
import Modal from "./Modal";

import "./App.css";
import "./Timer.css";

import backgroundImage1 from "./background/background12.png";
import backgroundImage2 from "./background/background2.png";
import backgroundImage3 from "./background/background3.png";
// import backgroundImage4 from "./background/background4.jpg";

const DEFAULT_SESSION_TYPE = "Focus";

export default function App() {
  const [sessionType, setSessionType] = useState(DEFAULT_SESSION_TYPE);
  const [showModal, setShowModal] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState(backgroundImage1);

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

  const refreshBackgroundImage = () => {
    const newBackgroundImage =
      backgroundUrl === backgroundImage1 ? backgroundImage2 : backgroundImage3;
    setBackgroundUrl(newBackgroundImage);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundUrl})` }}>
      <div className="gradient"></div>
      <div className="container">
        <SessionButtons handleSessionChange={handleSessionChange} />
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
        |
        <div className="refresh-background">
          <button onClick={refreshBackgroundImage}>Update Image</button>
        </div>
      </div>
    </div>
  );
}
