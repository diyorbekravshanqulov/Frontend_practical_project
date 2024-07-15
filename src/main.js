import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import i18n from "./plugins/i18n";
import router from "./router";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
// import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";


// Use plugin with optional defaults


const app = createApp(App);
const pinia = createPinia();

// Use the components
// app.component("VCalendar", Calendar);
// app.component("VDatePicker", DatePicker);
app.use(VCalendar, {});
app.use(i18n);
app.use(pinia);
app.use(router);
app.mount("#app");
