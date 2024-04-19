import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import Notifications from '@kyvg/vue3-notification'
import VueCookies from 'vue3-cookies'

import mitt from 'mitt';
const emitter = mitt();

const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.use(Notifications)
app.use(router).use(VueCookies, { expires: '30d'}).mount('#app')