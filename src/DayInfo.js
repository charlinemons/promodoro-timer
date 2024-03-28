import React, { useEffect, useState } from "react";

const DayInfo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const month = currentDate.toLocaleString("en-US", { month: "long" });
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return (
    <div id="day_info">
      <p>
        {month} {date}, {year} | {formattedTime}
      </p>
    </div>
  );
};

export default DayInfo;
