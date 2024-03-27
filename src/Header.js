import React from "react";
import "./Header.css";
import DayInfo from "./DayInfo";

function Header() {
  // Get current date
  const currentDate = new Date();
  // Format the date as needed
  const formattedDate = currentDate.toDateString(); // Example format: "Thu Mar 27 2024"

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
