import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorkerRegistration";

import ReactGA from "react-ga";
ReactGA.initialize("UA-51913269-1");
ReactGA.pageview(window.location.pathname);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Makes the site work offline and load faster, with some pitfalls.
serviceWorker.register();
