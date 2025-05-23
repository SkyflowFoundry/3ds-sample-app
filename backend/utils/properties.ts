const properties = {
  PORT : process.env.PORT || 8000,
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || "",
  CREDENTIALS_PATH:
    process.env.CREDENTIALS_PATH ||
    "",
  VAULT_URL: process.env.VAULT_URL || "",
  FINTECH_VAULT_ID:
    process.env.FINTECH_VAULT_ID || "",
  ACCOUNT_ID: process.env.ACCOUNT_ID || "",
  ACQUIRER_BIN: process.env.ACQUIRER_BIN || "",
  ACQUIRER_MERCHANT_ID: process.env.ACQUIRER_MERCHANT_ID || "",
  MCC: process.env.MCC || "",
  MERCHANT_NAME: process.env.MERCHANT_NAME || "",
  MERCHANT_URL:
    process.env.MERCHANT_URL ||
    "",
  MERCHANT_COUNTRY_CODE: process.env.MERCHANT_COUNTRY_CODE || "",
  REQUESTOR_NAME: process.env.REQUESTOR_NAME || "",
  REQUESTOR_ID: process.env.REQUESTOR_ID || "",
  THREE_DS_FINAL_AUTH_RESP_URL: process.env.THREE_DS_FINAL_AUTH_RESP_URL || "",
};

export default properties;
