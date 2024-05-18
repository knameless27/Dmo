<template>
  <div :style="style">
    <full-calendar ref="refCalendar" :options="calendarOptions" class="full-calendar" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import useCalendar from './useCalendar'
import { watch, defineEmits } from 'vue'

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
  setup(_, { emit }) {
    defineEmits(["isModalActive", "dayData"])
    const {
      refCalendar,
      isModalActive,
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

    watch(isModalActive, () => {
      emit("dayData", event)
      emit("isModalActive", isModalActive.value)
    })

    return {
      refCalendar,
      isModalActive,
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
