import React, { useEffect, useState } from "react";

const daysOfWeek = [
  { day: "Sunday" },
  { day: "Monday" },
  { day: "Tuesday" },
  { day: "Wednesday" },
  { day: "Thursday" },
  { day: "Friday" },
  { day: "Saturday" },
];

const DayInfo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const currentDay = daysOfWeek[currentDate.getDay()];
  const month = currentDate.toLocaleString("en-US", { month: "long" });
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

  return (
    <div id="day_info">
      <p>
        {month} {date}, {year} | {formattedTime} <br />
        {currentDay.smiley} <br />
        it’s <strong>{currentDay.day}</strong>
      </p>
    </div>
  );
};

export default DayInfo;
