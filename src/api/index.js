import axios from "axios";
import { getToken } from "auth_store/main.js";

const backUrl = process.env.VUE_APP_BACK_URL;

const defaultMethod = async ({ data, method, endpoint, id }) => {

  function getEndUrl(method, data, id) {
    if (method == "get") return `/${data}`;
    if (method == "put") return `/${id}`;
    return "";
  }

  try {
    console.log(getToken())
    const url = `${backUrl}${endpoint}${getEndUrl(method, data, id)}`;
    const config = {
      headers: {
        // Authorization: `Bearer ${store.creds.token}`,
      },
    };

    const response = await axios[method](
      url,
      method === "get" ? config : data,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error.message ? error.message : error);
    throw error; // Re-lanza el error para manejarlo donde se llame la función
  }
};

export default defaultMethod;
