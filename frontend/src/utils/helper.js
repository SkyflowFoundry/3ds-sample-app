import properties from "./properties";

export const getBaseUrl = () => {
  return `${properties.VAULT_URL}/v1/vaults/${properties.VAULT_ID}/`;
};


export const getBearerToken = () => {
  return new Promise((resolve, reject) => {
    const Http = new XMLHttpRequest();

    Http.onreadystatechange = () => {
      if (Http.readyState == 4) {
        if (Http.status == 200) {
          const response = JSON.parse(Http.responseText);
          resolve(response.accessToken);
        } else {
          reject("Error occurred");
        }
      }
    };

    Http.onerror = () => {
      reject("Error occurred");
    };

    //token end point
    const url = `${properties.BACKEND_URL}/authToken`;
    Http.open("GET", url, true);
    Http.send();
  });
};
