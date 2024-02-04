import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import "./index.css";
import App from "./App";
import { store } from "src/data/store";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "./theme";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
