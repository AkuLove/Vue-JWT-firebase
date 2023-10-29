import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.scss';
import App from './App.vue';
// import components from './components/UI/indexUI';
import router from './router/router';

const app = createApp(App);

// components.forEach((component, index) => {
//   if (component.name) {
//     app.component(component.name, component);
//   } else {
//     app.component(`component${index}`, component);
//   }
// });

app.use(router).use(createPinia()).mount('#app');
