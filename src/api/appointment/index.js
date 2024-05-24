import defaultMethod from "api/index.js";

const createAppointment = (data) => {
  try {
    return defaultMethod({ data, method: "post", endpoint: "appointment" });
  } catch (error) {
    console.log(error.message ? error.message : error);
    return { status: "VALIDATION", message: "Unexpected Error!" };
  }
};

const getAppointments = (data) => {
  try {
    return defaultMethod({ data, method: "get", endpoint: "appointment/index" });
  } catch (error) {
    console.log(error.message ? error.message : error);
    return { status: "VALIDATION", message: "Unexpected Error!" };
  }
};

const editAppointments = (data, id) => {
  try {
    return defaultMethod({ data, method: "put", endpoint: "appointment", id });
  } catch (error) {
    console.log(error.message ? error.message : error);
    return { status: "VALIDATION", message: "Unexpected Error!" };
  }
};

export default {
  createAppointment,
  getAppointments,
  editAppointments
};
