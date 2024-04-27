import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/views/main_page/HomePage.vue";
import LoginForm from "@/views/auth/LoginForm.vue";
import UserAppointment from "@/views/user_appointment/UserAppointment.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/book_appointment", component: UserAppointment },
  { path: "/login", component: LoginForm },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
