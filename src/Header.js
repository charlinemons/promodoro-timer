import React from "react";
import "./Header.css";
import DayInfo from "./DayInfo";

function Header() {
  // Get current date
  const currentDate = new Date();
  // Format the date as needed
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="Header">
      <div className="wrapper">
        <h1>Focus /</h1>
        <DayInfo />
        <p>{formattedDate}</p>
      </div>
    </div>
  );
}

export default Header;
