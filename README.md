# Demo apps

## Overview

Sample app for demonstrating Skyflow's 3DS flow.

Included are some basic build and run scripts you can use to start up the applications.


# Steps for starting the sample app
## Pre-requisite
 - node version equal or greater than 14

## Steps to start backend

### 1. Switch directory to backend
```
cd backend
```

### 2. Install dependencies
```
npm install
```

### 3. Add environment
Update the backend/.env file to add following values
```
PORT=
ALLOWED_ORIGIN=
CREDENTIALS_PATH=
VAULT_URL=
FINTECH_VAULT_ID=
ACCOUNT_ID=
ACQUIRER_BIN=
ACQUIRER_MERCHANT_ID=
MCC=
MERCHANT_NAME=
MERCHANT_URL=
MERCHANT_COUNTRY_CODE=
REQUESTOR_NAME=
REQUESTOR_ID=
THREE_DS_FINAL_AUTH_RESP_URL=
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

### 2. Install dependencies
```
npm install
```

### 3. Add environment variables
Update the frontend/.env file to add following values
```
PORT=
VAULT_ID=
VAULT_URL=
BACKEND_URL=
ORIGIN=
```

### 4. Start the server
```
npm start
```

## Testing the sample app
 - Navigate to frontend url on browser
 - Use the test cards to start the transaction
 - In case of challenge flow enter any 4 digit otp