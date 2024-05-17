<template>
    <div class="app-calendar overflow-hidden border">
        <div class="row no-gutters">
            <!-- Calendar -->
            <div class="col position-relative">
                <div class="card shadow-none border-0 mb-0 rounded-0">
                    <div class="card-body pb-0">
                        <full-calendar ref="refCalendar" :options="calendarOptions" class="full-calendar" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import store from '@/store'
import { onUnmounted } from '@vue/composition-api'
import calendarStoreModule from './calendarStoreModule'
import useCalendar from './useCalendar'

export default {
    components: {
        FullCalendar,
    },
    setup() {
        const CALENDAR_APP_STORE_MODULE_NAME = 'calendar'

        // Register module
        if (!store.hasModule(CALENDAR_APP_STORE_MODULE_NAME)) store.registerModule(CALENDAR_APP_STORE_MODULE_NAME, calendarStoreModule)

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(CALENDAR_APP_STORE_MODULE_NAME)) store.unregisterModule(CALENDAR_APP_STORE_MODULE_NAME)
        })

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

<style lang="scss">
.fc-sidebarToggle-button {
    // content: '';
    width: 25px;
    height: 25px;
    margin-right: 0.7rem !important;
    display: block;
    background-position: center;
    background-repeat: no-repeat;
}
</style>