import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import i18n from "./plugins/i18n";
import router from "./router";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
// import { setupCalendar, Calendar, DatePicker } from "v-calendar";
// import "v-calendar/style.css";
import Vue3Toastify from "vue3-toastify";
import YmapPlugin from "vue-yandex-maps";
import { useStore } from "./store";
import "leaflet-geosearch/dist/geosearch.css";

const app = createApp(App);


const pinia = createPinia();

app.use(Vue3Toastify, {
  autoClose: 3000,
});
app.use(VCalendar, {});
app.use(i18n);
app.use(pinia);
app.use(router);

const store = useStore();

const settings = {
  apiKey: "12091093-d99f-4896-9da2-665443cefca9", // Индивидуальный ключ API
  lang: store.lang == "uz" ? "uz_UZ" : "ru_RU", // Используемый язык
  coordorder: "latlong", // Порядок задания географических координат
  debug: false, // Режим отладки
  version: "2.1", // Версия Я.Карт
};
// Use plugin with optional defaults


app.use(YmapPlugin, settings);

// Use the components
// app.component("VCalendar", Calendar);
// app.component("VDatePicker", DatePicker);

app.mount("#app");
