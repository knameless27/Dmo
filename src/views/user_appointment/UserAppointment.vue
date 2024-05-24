<template>
    <MainModal :showModal="seeModal" @close-modal="setViewModal" :defaultButton="false" v-if="!logged">
        <strong>Registering and making an appointment for the {{ new Date(dayData.start).toLocaleDateString()
            }}</strong>
        <RegisterForm @successRegister="setNewApp" :time="true" />
    </MainModal>
    <MainModal :showModal="seeModal" @close-modal="setViewModal" :defaultButton="false" v-else>
        <strong>{{ editing ? 'Updating' : 'Making' }} an appointment for the {{ new
            Date(dayData.start).toLocaleDateString() }}</strong>
        <div style="padding-bottom:1vh; padding-top: 1vh">
            <b>Time</b>
            <input type="time" name="xd" id="" v-model="timexd" style="width: 80%">
        </div>
        <button class="b-block ptb-1 mb-1" type="submit" v-if="!loading" @click="editAppointment">Edit</button>
        <MainLoader v-else />
    </MainModal>
    <DefCalendar ref="cal" @isModalActive="setViewModal" @dayData="getDayData" />
</template>
<script>
import MainLoader from "@/components/MainLoader.vue"
import DefCalendar from "components/calendar/DefCalendar.vue"
import MainModal from "components/MainModal.vue";
import apmntService from "api/appointment/index.js"
import { getUser } from "auth_store/main.js"
import RegisterForm from "@/components/easyForms/RegisterForm.vue";
import { formatDate } from "mix/MainMixin.js";

export default {
    components: {
        DefCalendar,
        MainModal,
        RegisterForm,
        MainLoader,
    },
    data() {
        return {
            timexd: "",
            userData: {
                email: "",
                password: "",
                name: "",
                lastname: "",
                telephone: "",
                identification: "",
                address: "",
            },
            dayData: {
                start: "",
            },
            seeModal: false,
            loading: false,
            logged: false,
            editing: false,
            userCreds: getUser()
        }
    },
    created() {
        this.logged = this.userCreds ? true : false
    },
    methods: {
        setNewApp(user) {
            if (!user.time) return this.$toast.open({ message: "Time is required!", type: "info" });
            const data = {
                user_id: this.userCreds.user.id,
                date: formatDate(this.dayData.start, user.time),
                new_user: !this.logged,
                appointment_state_id: !this.logged ? null : 1,
                status: !this.logged ? null : 1,
            }
            this.loading = !this.loading
            apmntService.createAppointment(data).then(({ message, status }) => {
                this.$toast.open({ message, type: status });
                this.$refs.cal.refetchEvents()
                this.loading = !this.loading
            }).catch(e => {
                console.log(e);
                this.loading = !this.loading
            })
            this.setViewModal()
        },
        getDayData(dayData) {
            this.dayData = dayData
        },
        getTime(time) {
            const date = new Date(time);
            const hours = date.getHours();
            const minutes = date.getMinutes();

            // Formatear los minutos y segundos para que siempre tengan dos dígitos
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            
            const time24 = `${hours}:${formattedMinutes}`;

            return time24
        },
        editAppointment() {
            if (!this.timexd) return this.$toast.open({ message: "Time is required!", type: "info" });
            const data = {
                user_id: this.dayData.appointment.user_id,
                appointment_id: this.dayData.id,
                date: formatDate(this.dayData.start, this.timexd),
                new_user: false,
                appointment_state_id: !this.logged ? null : 1,
                status: !this.logged ? null : 1,
            }
            this.loading = !this.loading
            apmntService[this.editing ? 'editAppointments' : 'createAppointment'](data, this.dayData.id).then(({ message, status }) => {
                this.$toast.open({ message, type: status });
                this.$refs.cal.refetchEvents()
                this.loading = !this.loading
            }).catch(e => {
                console.log(e);
                this.loading = !this.loading
            })
            this.setViewModal()
        },
        setViewModal(data) {
            if (data && data.event && data.event.value) {
                this.timexd = this.getTime(data.event.value.start)
                data.event.value.title ? this.editing = true : this.editing = false
                this.seeModal = !this.seeModal
                return
            }
            this.dayData = {
                start: ""
            }
            this.seeModal = !this.seeModal
        }
    }
}
</script>