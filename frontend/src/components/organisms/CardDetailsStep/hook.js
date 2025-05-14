import React from "react";
import Skyflow from "skyflow-js";
import { useCollectContainer, REGEX_MATCH_RULE } from "skyflow-react-js";
import { useNavigate } from "react-router-dom";
import { authenticate3DS, cardLookup } from "../../../services/index";
import {
  THREE_DS_PAYMENT_SUCCESS_ROUTE,
  THREE_DS_PAYMENT_FAILURE_ROUTE,
  THREE_DS_PAYMENT_CHALLENGE_ROUTE,
} from "../../../utils/routes";

export const useCardDetails = () => {
  const container = useCollectContainer();
  const navigate = useNavigate();
  const [valid, setValid] = React.useState({
    name: false,
    card_number: false,
    cvv: false,
    exp_year: false,
    exp_month: false,
  });
  const [binValue, setBinValue] = React.useState("Visa");
  const regexMatchRule = {
    type: REGEX_MATCH_RULE,
    params: {
      regex: /^([a-zA-Z]+|([a-zA-Z ]+[a-zA-Z]))$/,
      error: "Please enter a valid name",
    },
  };
  const [loading, setLoading] = React.useState(false);

  const handleSubmitCardDetails = async () => {
    setLoading(true);
    try {
      const collectResponse = await container.collect();
      const browser_details = Skyflow.ThreeDS.getBrowserDetails();
      const bin_details = await cardLookup(binValue);
      const tokens = collectResponse.records[0].fields;
      const card_scheme = bin_details.cards_data.length > 0 ? bin_details.cards_data[0].card_scheme : "Visa";
      const authRequest = {
        card_details: {
          card_number: tokens.card_number,
          card_holder_name: tokens.cardholder_name,
          card_expiration_month: tokens.card_expiration_month,
          card_expiration_year: tokens.card_expiration_year,
          scheme_id: card_scheme,
        },
        browser_details,
      };
      const authResponse = await authenticate3DS(authRequest);
      setLoading(false);
      if (authResponse.transaction_status === "Y") {
        const transactionId = authResponse.transaction_id;
        navigate(`${THREE_DS_PAYMENT_SUCCESS_ROUTE}/${transactionId}`);
      } else {
        const transactionId = authResponse.transaction_id;
        navigate(THREE_DS_PAYMENT_CHALLENGE_ROUTE, {
          state: {
            acs_url: authResponse.acs_url,
            creq: authResponse.creq,
            transactionId,
          },
        });
      }
    } catch (e) {
      navigate(THREE_DS_PAYMENT_FAILURE_ROUTE);
    }
  };

  return {
    isSubmitDisabled: !(
      valid.card_number &&
      valid.cvv &&
      valid.exp_year &&
      valid.exp_month &&
      valid.name
    ),
    setValid,
    regexMatchRule,
    container,
    handleSubmitCardDetails,
    loading,
    setBinValue,
  };
};
