import { Box } from "@material-ui/core";
import React from "react";
import Skyflow from "skyflow-js";
import { useLocation, useNavigate } from "react-router-dom";
import {
  THREE_DS_PAYMENT_FAILURE_ROUTE,
  THREE_DS_PAYMENT_SUCCESS_ROUTE,
} from "../../../utils/routes";
import properties from "../../../utils/properties";

const ChallengeScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { acs_url, creq, transactionId } = location.state || {};
  React.useEffect(() => {
    if (acs_url && creq) {
      const challengeIframe = Skyflow.ThreeDS.showChallenge(acs_url, creq);
      challengeIframe.style.backgroundColor = "white";

      const handleMessage = (e) => {
        // eslint-disable-next-line no-console
        console.log("Received message from iframe:", e.origin);
        if (e.origin === properties.ORIGIN) {
          if (e.data && e.data.hasOwnProperty("status")) {
            const iframe = document.getElementById("challengeIframe");
            if (iframe) {
              iframe.remove();
            }
            if (e.data.status === "SUCCESS") {
              navigate(`${THREE_DS_PAYMENT_SUCCESS_ROUTE}/${transactionId}`);
            } else if (e.data.status === "FAILED") {
              navigate(THREE_DS_PAYMENT_FAILURE_ROUTE);
            }
            window.removeEventListener("message", handleMessage);
          }
        }
      };

      window.addEventListener("message", handleMessage);
    } else {
      navigate(THREE_DS_PAYMENT_FAILURE_ROUTE);
    }
  }, [acs_url, creq]);

  return <Box></Box>;
};

export default ChallengeScreen;
