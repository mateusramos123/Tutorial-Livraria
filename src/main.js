import './assets/main.css'
import '@mdi/font/css/materialdesignicons.min.css'


import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
