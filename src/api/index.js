import axios from "axios";
import pinia from "core/pinia.js";
import { userCreds } from "auth_store/main.js";

const backUrl = process.env.VUE_APP_BACK_URL;

const defaultMethod = async ({ data, method, endpoint }) => {
  const store = userCreds(pinia);

  try {
    const url = `${backUrl}${endpoint}${method === "get" ? `/${data}` : ""}`;
    const config = {
      headers: {
        Authorization: `Bearer ${store.creds.token}`,
      },
    };

    const response = await axios[method](url, method === "get" ? config : data, config);
    return response.data;
  } catch (error) {
    console.log(error.message ? error.message : error);
    throw error; // Re-lanza el error para manejarlo donde se llame la función
  }
};

export default defaultMethod;
