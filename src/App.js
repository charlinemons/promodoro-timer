import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Timer from "./Timer";
import { ColorModeProvider } from "./ColorModeContext";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light", // Initial mode
    },
  });

  return (
    <ColorModeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Timer />
        </div>
      </ThemeProvider>
    </ColorModeProvider>
  );
}

export default App;
