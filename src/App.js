//App.js
import React, { useState } from "react";
import Timer from "./Timer";
import Header from "./Header";
import ChangeTimer from "./ChangeTimer";
import Modal from "./Modal";
import ToDo from "./ToDo";
import Notes from "./Notes";
import Calendar from "./Calendar";

import "./App.css";
import "./Timer.css";

const DEFAULT_SESSION_TYPE = "Focus";

export default function App() {
  const [sessionType, setSessionType] = useState(DEFAULT_SESSION_TYPE);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("light"); // State to track the theme

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

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <div className={`App ${theme}`}>
      <div className="container">
        <Header />
        <h2 className="stay-focus">
          {/* Get shit done & don't give a fuck about what other people think */}
        </h2>
        <div className="notes-section">
          <ToDo />
          <Notes />
          <Calendar />
          {/* <Timer sessionType={sessionType} /> */}
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
          <div className="theme-dropdown">
            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Mode</option>
              <option value="colorful">Colorful Theme</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
