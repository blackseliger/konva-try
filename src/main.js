import { createApp } from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva'
import Vue3TouchEvents from "vue3-touch-events"


createApp(App).use(VueKonva).use(Vue3TouchEvents).mount('#app')
