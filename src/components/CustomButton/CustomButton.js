import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00695f",
    },
    secondary: {
      main: "#1c54b2",
    },
  },
});

function CustomButton({ text, onClick, size }) {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color="secondary"
        onClick={onClick}
        size={size}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
}

export default CustomButton;
