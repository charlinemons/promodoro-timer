import React from "react";
import "./Header.css";
import DayInfo from "./DayInfo";

function Header() {
  return (
    <div className="Header">
      <div className="wrapper">
        <h1>Focus /</h1>
        <DayInfo />
      </div>
    </div>
  );
}

export default Header;
