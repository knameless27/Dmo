import defaultMethod from "api/index.js";

const createAppointment = (data) => {
  try {
    return defaultMethod({ data, method: "post", endpoint: "calendar-events" });
  } catch (error) {
    console.log(error.message ? error.message : error);
    return { status: "VALIDATION", message: "Unexpected Error!" };
  }
};

const getAppointments = (data) => {
  try {
    return defaultMethod({ data, method: "get", endpoint: "calendar-events/index/" });
  } catch (error) {
    console.log(error.message ? error.message : error);
    return { status: "VALIDATION", message: "Unexpected Error!" };
  }
};

export default {
  createAppointment,
  getAppointments,
};
