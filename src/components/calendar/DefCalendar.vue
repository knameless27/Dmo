<template>
  <div :style="style">
    <full-calendar ref="refCalendar" :options="calendarOptions" class="full-calendar" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import useCalendar from './useCalendar'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  props: {
    style: {
      type: String,
      required: true,
      default: "",
    }
  },
  setup() {
    const {
      refCalendar,
      isCalendarOverlaySidebarActive,
      event,
      clearEventData,
      addEvent,
      updateEvent,
      removeEvent,
      fetchEvents,
      refetchEvents,
      calendarOptions,

      // ----- UI ----- //
      isEventHandlerSidebarActive,
    } = useCalendar()

    fetchEvents()

    return {
      refCalendar,
      isCalendarOverlaySidebarActive,
      event,
      clearEventData,
      addEvent,
      updateEvent,
      removeEvent,
      refetchEvents,
      calendarOptions,

      // ----- UI ----- //
      isEventHandlerSidebarActive,
    }
  },
}
</script>

<style>
.fc-sidebarToggle-button {
  background-image: red;
  margin-right: 0.7rem !important;
  display: block;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
