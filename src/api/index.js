import axios from "axios";

const backUrl = process.env.VUE_APP_BACK_URL;

const defaultMethod = ({ data, method, endpoint, params }) => {
  try {
    return new Promise((resolve) => {
      axios[method](
        `${backUrl}${endpoint}`,
        method == "get" ? params : data
      ).then(({ data }) => {
        resolve(data);
      });
    });
  } catch (error) {
    console.log(error.message ? error.message : error);
  }
};

export default defaultMethod;
