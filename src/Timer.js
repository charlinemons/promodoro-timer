import Box from "@mui/material/Box";
import Settings from "./Settings";
import Play from "./Play";
import Next from "./Next";

const Timer = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
      <Box>Focus</Box>
      <Box fontSize={"256px"}>05:00</Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        gap={"20px"}
      >
        <Settings>Settings</Settings>
        <Play>Play</Play>
        <Next>Next Button</Next>
      </Box>
    </Box>
  );
};

export default Timer;
