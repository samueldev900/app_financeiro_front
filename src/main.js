import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router/index";  // Certifique-se de importar o Vue Router
import './assets/main.css'; // Ou o caminho correto para o seu arquivo CSS
import VueTheMask from 'vue-the-mask';


const Vue = createApp(App);
Vue.use(router);
Vue.use(VueTheMask);
Vue.mount('#app');
