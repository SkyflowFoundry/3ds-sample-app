import axios, { AxiosError } from "axios";
import properties from "../../utils/properties";
import { logger } from "../../utils/logger";
import { v4 as uuidv4 } from "uuid";
const { generateBearerToken, isValid } = require("skyflow-node");

let tokenObject: any = { accessToken: "" };

export const threeDSAuthenticate = async (req: any, res: any) => {
  logger.info("3DS Authenticate request received:", req.body);
  try {
    const bearerToken: any = await getSkyflowBearerToken();
    const url = `${properties.VAULT_URL}/v1/3DSAuthenticate`;
    const headers = {
      "X-SKYFLOW-ACCOUNT-ID": properties.ACCOUNT_ID,
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken.accessToken}`,
    };
    const server_trans_id = uuidv4();
    const requestBody = {
      ...req.body,
      guest_checkout: false,
      vault_id: properties.FINTECH_VAULT_ID,
      acquirer_details: {
        acquirer_bin: properties.ACQUIRER_BIN,
        acquirer_merchant_id: properties.ACQUIRER_MERCHANT_ID,
      },
      merchant_details: {
        mcc: properties.MCC,
        merchant_name: properties.MERCHANT_NAME,
        merchant_url: properties.MERCHANT_URL,
        merchant_country_code: properties.MERCHANT_COUNTRY_CODE,
      },
      requestor_name: properties.REQUESTOR_NAME,
      requestor_id: properties.REQUESTOR_ID,
      server_trans_id,
      requestor_final_auth_resp_url: `${properties.ORIGIN}/threeDSRespUrl`,
      amount_details: {
        amount: "100",
        purchase_currency: "840",
        purchase_exponent: 1,
      },
    };
    const response = await axios.post(url, requestBody, { headers });
    if (response.data.authentication_response.trans_status == "Y") {
      const cryptogramUrl = `${properties.VAULT_URL}/v1/generate3DSCryptogram`;
      const cryptogramBody = {
        transaction_id: server_trans_id,
        vault_id: properties.FINTECH_VAULT_ID,
      };
      const three_ds_response = await axios.post(
        cryptogramUrl,
        cryptogramBody,
        {
          headers,
        }
      );

      // Send the response back to the client
      res.status(response.status).json({
        ...three_ds_response.data,
        transaction_status: response.data.authentication_response.trans_status,
        transaction_id: response.data.authentication_response.server_trans_id,
      });
    } else {
      res.status(response.status).json({
        creq: response.data.creq,
        acs_url: response.data.authentication_response.acs_url,
        transaction_status: response.data.authentication_response.trans_status,
        transaction_id: response.data.authentication_response.server_trans_id,
      });
    }
  } catch (error) {
    // Handle errors from the backend service
    logger.error("Error forwarding request:", error);
    res.status(error.response ? error.response.status : 500).json({
      message: "Error forwarding request",
      error: error.message,
    });
  }
};

const generate3DSCryptogram = async (transaction_id: string) => {
  try {
    const url = `${properties.VAULT_URL}/v1/generate3DSCryptogram`;
    const bearerToken: any = await getSkyflowBearerToken();
    const headers = {
      "X-SKYFLOW-ACCOUNT-ID": properties.ACCOUNT_ID,
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken.accessToken}`,
    };
    const response = await axios.post(
      url,
      { transaction_id, vault_id: properties.FINTECH_VAULT_ID },
      {
        headers,
      }
    );

    // Send the response back to the client
    return response;
  } catch (error) {
    // Handle errors from the backend service
    logger.error("Error forwarding request:", error.message);
    throw error;
  }
};

export const threeDSFinalResp = async (req: any, res: any) => {
  try {
    const decodedString = JSON.parse(
      Buffer.from(String(req.body.cres), "base64").toString("utf8")
    );

    const cryptogramResp = await generate3DSCryptogram(
      decodedString.threeDSServerTransID
    );
    if (cryptogramResp) {
      const scriptResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>3D Secure Challenge Response</title>
        </head>
        <body>
          <script type="text/javascript">
            // Post a message to the parent window indicating the challenge is complete
            window.parent.postMessage({ status: "SUCCESS", transactionId: "${decodedString.threeDSServerTransID}" }, "*");
          </script>
        </body>
      </html>
    `;

      res.status(200).send(scriptResponse);
    } else {
      const scriptResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>3D Secure Challenge Response</title>
        </head>
        <body>
          <script type="text/javascript">
            // Post a message to the parent window indicating the challenge is complete
            window.parent.postMessage({ status: "FAILED", transactionId: "${decodedString.threeDSServerTransID}" }, "*");
          </script>
        </body>
      </html>
    `;

      res.status(200).send(scriptResponse);
    }
  } catch (error) {
    logger.error("Error forwarding request:", error);
    const scriptResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>3D Secure Challenge Response</title>
        </head>
        <body>
          <script type="text/javascript">
            // Post a message to the parent window indicating the challenge is complete
            window.parent.postMessage({ status: "FAILED" }, "*");
          </script>
        </body>
      </html>
    `;

    res.status(200).send(scriptResponse);
  }
};

export const cardLookup = async (bin: string) => {
  try {
    const url = `${properties.VAULT_URL}/v1/card_lookup`;
    const bearerToken: any = await getSkyflowBearerToken();
    const headers = {
      "X-SKYFLOW-ACCOUNT-ID": properties.ACCOUNT_ID,
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken.accessToken}`,
    };
    const response = await axios.post(
      url,
      { BIN: bin },
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error in cardLookupService:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch card details");
  }
};

export function getSkyflowBearerToken() {
  return new Promise(async (resolve, reject) => {
    try {
      if (isValid(tokenObject.accessToken)) resolve(tokenObject);
      else {
        let response = await generateBearerToken(properties.CREDENTIALS_PATH);
        tokenObject = response;
        resolve(tokenObject);
      }
    } catch (e) {
      reject(e);
    }
  });
}
