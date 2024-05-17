import { defineStore } from "pinia";

export const storeCalendar = defineStore({
  id: "def-cal",
  state: () => ({
    calendar: {
      selectedCalendars: "",
      title: "",
      start: "",
      end: "",
      allDay: false,
      url: "",
      extendedProps: {
        calendar: "",
        guests: [],
        location: "",
        description: "",
      },
    },
  }),
  actions: {
    newData(newData) {
      this.data = newData;
    },
    noData() {
      this.data = {};
    },
  },
});
