# Demo apps

## Overview

Sample app for demonstrating Skyflow's 3DS flow.

Included are some basic build and run scripts you can use to start up the applications.


# Steps for starting the sample app
## Pre-requisite
 - node version 14

## Steps to start beffe

### 1. Switch directory to beffe
```
cd beffe
```

### 2. Setup npm registry
 - set the npm registry to prekarilabs
```
npm set registry https://prekarilabs.jfrog.io/prekarilabs/api/npm/npm/
```
 - login to npm
```
npm login
```
 - login using credentials

### 3. Install dependencies
```
npm install
```

### 4. Update properties file
Update the beffe/utils/properties.ts file to add following values
```
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || "", // origins to be allowed, * in case of localhost
  CREDENTIALS_PATH:
    process.env.CREDENTIALS_PATH ||
    "", // path to credentials file for service account
  VAULT_URL: process.env.VAULT_URL || "", // vault url
  FINTECH_VAULT_ID:
    process.env.FINTECH_VAULT_ID || "", // vault id
  ACCOUNT_ID: process.env.ACCOUNT_ID || "", // account id
  ORIGIN: process.env.ORIGIN || "", // url of running beffe
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
```

### 4. Start the server
```
npm start
```

## Steps to start frontend

### 1. Switch directory to frontend
```
cd frontend
```

### 2. Setup npm registry
 - set the npm registry to prekarilabs
```
npm set registry https://prekarilabs.jfrog.io/prekarilabs/api/npm/npm/
```
 - login to npm
```
npm login
```
 - login using credentials

### 3. Install dependencies
```
npm install
```

### 4. Update properties file
Update the frontend/src/utils/properties.js file to add following values
```
  VAULT_ID: process.env.VAULT_ID || "", // vault id
  VAULT_URL: process.env.VAULT_URL || "", // vault url
  BEFFE_URL: process.env.BEFFE_URL || "", // url of running beffe
  ORIGIN: process.env.ORIGIN || "", // url of running beffe
```

### 4. Start the server
```
npm start
```

## Testing the sample app
 - Navigate to frontend url on browser
 - Use the test cards to start the transaction
 - In case of challenge flow enter any 4 digit otp