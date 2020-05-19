import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import './styles/styles.css';
import axios from 'axios';
window.axios = axios;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
