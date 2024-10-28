import axios from "axios";
import { CONSTANTS } from "../../constants/Constants";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchUser = async (search_text) => {
  try {
    await delay(1000);
    const res = await axios.post(
      `http://localhost:8000${CONSTANTS.API_CONFIG.SEARCH_USER}?query=${search_text}`
    );
    return res?.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
