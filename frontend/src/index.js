import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {getBearerToken} from "./utils/helper"
import { Env, LogLevel, SkyflowElements } from "skyflow-react-js";
import properties from "./utils/properties";

const config = {
  vaultID: properties.VAULT_ID,
  vaultURL: properties.VAULT_URL,
  getBearerToken,
  options: {
    logLevel: LogLevel.ERROR,
    env: Env.PROD,
  },
};

ReactDOM.render(
  <SkyflowElements config={config}>
      <App />
    </SkyflowElements>,
  document.getElementById("app")
);
