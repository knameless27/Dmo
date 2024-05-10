import defaultMethod from "api/index.js";

const login = (data) => {
  try {
    return defaultMethod({ data, method: "post", endpoint: "login" });
  } catch (error) {
    console.log(error.message ? error.message : error);
    return {status: 'VALIDATION', message: "Unexpected Error!"}
  }
};

const register = (data) => {
  try {
    return defaultMethod({ data, method: "post", endpoint: "register" });
  } catch (error) {
    console.log(error.message ? error.message : error);
    return {status: 'VALIDATION', message: "Unexpected Error!"}
  }
};

export default {
    login,
    register
};
