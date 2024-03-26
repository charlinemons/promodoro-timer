import React from "react";
import "./Modal.css";

export default function Modal({ showModal, closeModal }) {
  return (
    <div className="Modal">
      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="modal-close" onClick={closeModal}>
              &times;
            </span>
            <h2>About this app</h2>
            <p>
              <strong>How does it work?</strong>
              <br />
              <ol>
                <li>
                  <strong>Choose a Task: </strong>Select a task you want to work
                  on.
                </li>
                <li>
                  <strong>Set a Timer: </strong>Set a timer for 25 minutes (this
                  is one "Pomodoro" session).
                </li>
                <li>
                  <strong>Work on the Task: </strong>Work on the task without
                  any distractions or interruptions until the timer rings.
                </li>
                <li>
                  <strong>Take a Short Break: </strong>Take a short break
                  (usually 5 minutes) to rest and recharge.
                </li>
                <li>
                  <strong>Repeat: </strong>After completing one Pomodoro
                  session, start another one. After every four Pomodoros, take a
                  longer break (usually 15-30 minutes).
                </li>
              </ol>
            </p>

            <small>
              The Pomodoro Technique is a time management method developed by
              Francesco Cirillo in the late 1980s. It's named after the Italian
              word for "tomato" because Cirillo initially used a tomato-shaped
              kitchen timer to track his work intervals.
            </small>
            <p className="tomato">🍅 🍅 🍅 🍅 🍅 🍅 🍅</p>
            <small>
              Coded by{" "}
              <a
                href="https://charlinemons.com"
                title="Charline Mons's portfolio (opens in new tab)"
                target="_blank"
                rel="noreferrer"
              >
                Charline Mons
              </a>
              <br />
              Color Palette inspired by Neon Genesis Evangelion.
            </small>
          </div>
        </div>
      )}
    </div>
  );
}
