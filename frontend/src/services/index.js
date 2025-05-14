import axios from "axios";
import properties from "../utils/properties";

export async function authenticate3DS(data) {
  try {
    const response = await axios.post(
      `${properties.BEFFE_URL}/3DSAuthenticate`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const cardLookup = async (bin) => {
  try {
    const response = await axios.post(
      `${properties.BEFFE_URL}/card_lookup`,
      { BIN: bin },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch card details");
  }
};
