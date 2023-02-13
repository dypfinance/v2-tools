import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ReactGA from "react-ga";
import getLibrary from "./functions/hooks";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
          <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
