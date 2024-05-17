import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useToast } from "vue-toast-notification";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { storeCalendar } from "store/defaultCalendar/main.js";

export default function userCalendar() {
  const store = storeCalendar();
  const toast = useToast();
  const refCalendar = ref(null);
  let calendarApi = null;

  const handleRightClick = (event) => {
    event.preventDefault();
    console.log(event);
    const calendarEl = event.target.closest(".fc-daygrid-day"); // Ajusta el selector según tu estructura
    if (calendarEl) {
      const dateStr = calendarEl.getAttribute("data-date");
      alert("Hiciste clic derecho en la fecha: " + dateStr);
    }
  };

  onMounted(() => {
    calendarApi = refCalendar.value.getApi();
    console.log(calendarOptions);
    const calendarEl = refCalendar.value.$el;
    calendarEl.addEventListener("contextmenu", handleRightClick);
    console.log("calendar api ", calendarApi);
  });

  onBeforeUnmount(() => {
    const calendarEl = refCalendar.value.$el;
    calendarEl.removeEventListener("contextmenu", handleRightClick);
  });

  const calendarsColor = {
    Business: "primary",
    Holiday: "success",
    Personal: "danger",
    Family: "warning",
    ETC: "info",
  };

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

  const fetchEvents = (info, successCallback) => {
    if (!info) return;
    successCallback([
      {
        allDay: true,
        id: "waos",
        title: "all dei",
        start: "2024-05-17 10:00:00",
        end: "2024-05-18 10:00:00",
      },
      {
        id: "waos",
        title: "super waos",
        start: "2024-05-17 10:00:00",
        end: "2024-05-18 10:00:00",
      },
      {
        id: "waos",
        title: "super waos",
        start: "2024-05-17 10:00:00",
        end: "2024-05-18 10:00:00",
      },
      {
        id: "waos",
        title: "super waos",
        start: "2024-05-17 10:00:00",
        end: "2024-05-18 10:00:00",
      },
    ]);
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
    dayMaxEvents: 2,
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
      console.log(clickedEvent);
      event.value = grabEventDataFromEventApi(clickedEvent);

      isEventHandlerSidebarActive.value = true;
    },

    customButtons: {
      sidebarToggle: {
        text: "sidebar",
        click() {
          isCalendarOverlaySidebarActive.value =
            !isCalendarOverlaySidebarActive.value;
        },
      },
    },

    dateClick(info) {
      console.log("date click ", info);
      event.value = JSON.parse(
        JSON.stringify(Object.assign(event.value, { start: info.date }))
      );
      isEventHandlerSidebarActive.value = true;
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

  const isEventHandlerSidebarActive = ref(false);
  const isCalendarOverlaySidebarActive = ref(false);

  return {
    refCalendar,
    isCalendarOverlaySidebarActive,
    calendarOptions,
    event,
    clearEventData,
    addEvent,
    updateEvent,
    removeEvent,
    refetchEvents,
    fetchEvents,
    isEventHandlerSidebarActive,
  };
}
