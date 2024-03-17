import React from "react";
import generateMuiTheme from "./mui/theme";
import { ThemeProvider } from "@material-ui/styles";
import App from "./App";

export default function MeetIndex() {
  return (
    <>
      <ThemeProvider theme={generateMuiTheme()}>
        <App />
      </ThemeProvider>
    </>
  );
}
