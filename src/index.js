import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Publicsale from "./Publicsale";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./styles/reset.css";
import GlobalStyle from "./fonts";

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />    /* App is for presale, Publicsale is for public sale */
    {/* <Publicsale />  */}
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
