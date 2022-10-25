import { createApp } from 'vue'
import App from './App'
import BootstrapVue3 from 'bootstrap-vue-3'
import router from "./router/router";
import store from "./store/index.js";
import VueCookies from "vue3-cookies";
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";

createApp(App)
    .use(BootstrapVue3)
    .use(router)
    .use(store)
    .use(Toast)
    .use(VueCookies)
    .mount('#app')
