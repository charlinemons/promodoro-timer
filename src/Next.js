import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { ColorModeContext } from "./ColorModeContext";

function Next() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <div>
      {mode} mode
      <Button variant="contained" onClick={toggleColorMode}>
        Next
      </Button>
    </div>
  );
}

export default Next;
