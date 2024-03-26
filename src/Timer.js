import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Settings from "./Settings";
import Play from "./Play";
import Next from "./Next";

// Constants representing initial time in seconds
const FOCUS_TIME_SECONDS = 300; // 5 minutes
const SHORT_BREAK_TIME_SECONDS = 150; // 2.5 minutes
const LONG_BREAK_TIME_SECONDS = 900; // 15 minutes

// Define the flow of states
const STATE_FLOW = [
  "FOCUS",
  "SHORT_BREAK",
  "FOCUS",
  "SHORT_BREAK",
  "FOCUS",
  "SHORT_BREAK",
  "FOCUS",
  "LONG_BREAK",
];

const Timer = () => {
  // State variables
  const [currentFlowIndex, setCurrentFlowIndex] = useState(0);
  const [currentState, setCurrentState] = useState(
    STATE_FLOW[currentFlowIndex]
  );
  const [time, setTime] = useState(FOCUS_TIME_SECONDS);
  const [startTimer, setStartTimer] = useState(false);

  // Function to handle starting the timer
  const handleStartTimer = () => {
    setStartTimer(true);
  };

  // Function to handle state transitions
  const handleSetState = () => {
    setCurrentFlowIndex((prevIndex) => (prevIndex + 1) % STATE_FLOW.length);
    setCurrentState(STATE_FLOW[currentFlowIndex]);
    setStartTimer(false); // Pause timer when changing states
    setTime(getTimeForState(STATE_FLOW[currentFlowIndex]));
  };

  // Function to get time for different states
  const getTimeForState = (state) => {
    switch (state) {
      case "FOCUS":
        return FOCUS_TIME_SECONDS;
      case "SHORT_BREAK":
        return SHORT_BREAK_TIME_SECONDS;
      case "LONG_BREAK":
        return LONG_BREAK_TIME_SECONDS;
      default:
        return 0;
    }
  };

  // useEffect hook to handle timer logic
  useEffect(() => {
    if (startTimer && time > 0) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTimer, time]);

  // JSX to render
  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
      <Box>{currentState}</Box>
      <Box fontSize={"256px"}>{formatTime(time)}</Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        gap={"20px"}
      >
        <Settings>Settings</Settings>
        <Play onClick={handleStartTimer}>Play</Play>
        <Next onClick={handleSetState}>Next Button</Next>
      </Box>
    </Box>
  );
};

// Function to format time into mm:ss format
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export default Timer;
