import {createApp} from 'vue'
import App from './App'
import router from "./router/router";
import store from "./store/index.js";
import VueCookies from "vue3-cookies";
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'


const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'myCustomTheme',
        themes: {
            myCustomTheme: {
                colors: {
                    surface: '#E1E6F9',
                    background: '#ffffff',
                    element: '#ffffff',
                    light_item:'#eef0fb'
                }
            }
        }
    }
})


createApp(App)
    .use(vuetify)
    .use(router)
    .use(store)
    .use(Toast)
    .use(VueCookies)
    .use(VueSidebarMenu)
    .mount('#app')
