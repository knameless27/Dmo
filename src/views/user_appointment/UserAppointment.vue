<template>
    <!-- <MainCard style="width: 80%; height: 80%">
    </MainCard> -->
    <MainModal :showModal="seeModal" @close-modal="setViewModal" :defaultButton="false">
        <strong>Registering and making an appointment for the {{ new Date(dayData.start).toLocaleString() }}</strong>
        <RegisterForm @successRegister="setNewApp" />
    </MainModal>
    <DefCalendar @isModalActive="setViewModal" @dayData="getDayData" />
</template>
<script>
import DefCalendar from "components/calendar/DefCalendar.vue"
import MainModal from "components/MainModal.vue";
import apmntService from "api/appointment/index.js"
import { userCreds } from "auth_store/main.js"
import RegisterForm from "@/components/easyForms/RegisterForm.vue";
import { formatDate } from "mix/MainMixin.js";
import pinia from "core/pinia.js";

export default {
    components: {
        DefCalendar,
        MainModal,
        RegisterForm
    },
    data() {
        return {
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
            Store: userCreds(pinia)
        }
    },
    created() {
        console.log(this.Store);
    },
    methods: {
        setNewApp() {
            const data = {
                user_id: this.Store.creds.user.id,
                date: formatDate(this.dayData.start),
                new_user: true,
            }
            apmntService.createAppointment(data).then((res) => {
                console.log(res);
            }).catch(e => {
                console.log(e);
            })
            this.setViewModal()
        },
        getDayData(dayData) {
            this.dayData = dayData
        },
        setViewModal() {
            console.log("waos xd ", this.Store);
            this.seeModal = !this.seeModal
        }
    }
}
</script>