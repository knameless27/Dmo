/* eslint-disable */
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import apmntService from "api/appointment/index.js";
import { useToast } from "vue-toast-notification";
import { ref, computed, onMounted } from "vue";
import { storeCalendar } from "store/defaultCalendar/main.js";

export default function userCalendar() {
  const store = storeCalendar();
  const toast = useToast();
  const refCalendar = ref(null);
  let calendarApi = null;
  const blankEvent = {
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
  };
  const event = ref(JSON.parse(JSON.stringify(blankEvent)));

  onMounted(() => {
    calendarApi = refCalendar.value.getApi();
  });

  const calendarsColor = {
    Business: "primary",
    Holiday: "success",
    Personal: "danger",
    Family: "warning",
    ETC: "info",
  };

  const clearEventData = () => {
    event.value = JSON.parse(JSON.stringify(blankEvent));
  };

  const updateEventInCalendar = (
    updatedEventData,
    propsToUpdate,
    extendedPropsToUpdate
  ) => {
    toast({ message: "Event Updated", type: "success" });

    const existingEvent = calendarApi.getEventById(updatedEventData.id);

    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index];
      existingEvent.setProp(propName, updatedEventData[propName]);
    }

    existingEvent.setDates(updatedEventData.start, updatedEventData.end, {
      allDay: updatedEventData.allDay,
    });

    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index];
      existingEvent.setExtendedProp(
        propName,
        updatedEventData.extendedProps[propName]
      );
    }
  };

  const removeEventInCalendar = (eventId) => {
    toast({ message: "Event Removed", type: "success" });
    calendarApi.getEventById(eventId).remove();
  };

  const grabEventDataFromEventApi = (eventApi) => {
    const {
      id,
      title,
      start,
      end,
      extendedProps: { calendar, guests, location, description },
      allDay,
    } = eventApi;

    return {
      id,
      title,
      start,
      end,
      extendedProps: {
        calendar,
        guests,
        location,
        description,
      },
      allDay,
    };
  };

  const addEvent = (eventData) => {
    console.log("eventito miamor ", eventData);
    // store.dispatch("calendar/addEvent", { event: eventData }).then(() => {
    //   // eslint-disable-next-line no-use-before-define
    //   refetchEvents();
    // });
  };

  const updateEvent = (eventData) => {
    console.log("c actualiza", eventData);
    const waos = false;
    if (waos)
      store
        .dispatch("calendar/updateEvent", { event: eventData })
        .then((response) => {
          const updatedEvent = response.data.event;

          const propsToUpdate = ["id", "title", "url"];
          const extendedPropsToUpdate = [
            "calendar",
            "guests",
            "location",
            "description",
          ];

          updateEventInCalendar(
            updatedEvent,
            propsToUpdate,
            extendedPropsToUpdate
          );
        });
  };

  const removeEvent = () => {
    const eventId = event.value.id;
    store.dispatch("calendar/removeEvent", { id: eventId }).then(() => {
      removeEventInCalendar(eventId);
    });
  };

  const refetchEvents = () => {
    calendarApi.refetchEvents();
  };

  // const selectedCalendars = computed(
  //   () => store.calendar.selectedCalendars
  // );

  // watch(selectedCalendars, () => {
  //   refetchEvents();
  // });
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const increaseHourByOne = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 1);
    return date;
  };

  function remakeAppointments(data) {
    const newData = data.map((app) => {
      return {
        appointment: app,
        id: app.id,
        title: app.user.full_name,
        start: new Date(app.date),
        end: increaseHourByOne(app.date),
        color: getRandomColor()
      };
    });
    return newData;
  }

  const fetchEvents = async (info, successCallback) => {
    if (!info) return;

    const response = await apmntService.getAppointments(25);
    const newData = remakeAppointments(response.data.data);
    successCallback(newData);
    console.log(newData);
    // successCallback([
    //   {
    //     allDay: true,
    //     id: "waos",
    //     title: "all dei",
    //     start: "2024-05-17 11:00:00",
    //     end: "2024-05-18 10:00:00",
    //   },
    //   {
    //     id: "waos",
    //     title: "super waos",
    //     start: "2024-05-17 12:00:00",
    //     end: "2024-05-18 10:00:00",
    //   },
    //   {
    //     id: "waos",
    //     title: "super waos",
    //     start: "2024-05-17 13:00:00",
    //     end: "2024-05-18 10:00:00",
    //   },
    //   {
    //     id: "waos",
    //     title: "super waos",
    //     start: "2024-05-17 14:00:00",
    //     end: "2024-05-18 10:00:00",
    //   },
    // ]);
    // store
    //   .dispatch("calendar/fetchEvents", {
    //     calendars: selectedCalendars.value,
    //   })
    //   .then((response) => {
    //     successCallback(response.data);
    //   })
    //   .catch(() => {
    //     toast({ message: "Error fetching calendar events", type: "error" });
    //   });
  };

  const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      start: "sidebarToggle, prev,next, title",
      end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    events: fetchEvents,
    editable: true,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 25,
    navLinks: true,
    businessHours: {
      // Specify business hours for different days of the week
      daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
      startTime: "09:00", // 9am
      endTime: "17:00", // 5pm
    },
    eventSources: [
      {
        events: [
          {
            start: "2024-05-17",
            end: "2024-05-18",
            display: "background",
            color: "#ff9f89", // color for non-working day
            title: "Holiday",
          },
        ],
      },
    ],

    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName =
        calendarsColor[calendarEvent._def.extendedProps.calendar];

      return [
        // Background Color
        `bg-light-${colorName}`,
      ];
    },
    eventClick({ event: clickedEvent }) {
      event.value = grabEventDataFromEventApi(clickedEvent);

      isModalActive.value = !isModalActive.value;
    },

    customButtons: {
      sidebarToggle: {
        text: "sidebar",
        click() {
          isModalActive.value = !isModalActive.value;
        },
      },
    },

    dateClick(info) {
      console.log("date click ", info);
      event.value = JSON.parse(
        JSON.stringify(Object.assign(event.value, { start: info.date }))
      );
      isModalActive.value = !isModalActive.value;
    },

    eventDrop({ event: droppedEvent }) {
      updateEvent(grabEventDataFromEventApi(droppedEvent));
    },

    eventResize({ event: resizedEvent }) {
      updateEvent(grabEventDataFromEventApi(resizedEvent));
    },

    direction: computed(() => "ltr"),
    rerenderDelay: 350,
  });

  const isModalActive = ref(false);

  return {
    refCalendar,
    isModalActive,
    calendarOptions,
    event,
    clearEventData,
    addEvent,
    updateEvent,
    removeEvent,
    refetchEvents,
    fetchEvents,
  };
}
