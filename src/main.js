import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@/router/main";
import { createI18n } from "vue-i18n";
import EN from "@/lang/en.json"
import FR from "@/lang/fr.json"

const i18n = createI18n({
  locale: localStorage.getItem("locale"),
  messages: {
    EN: EN,
    FR: FR,
  }
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount("#app");
