import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import { createPinia } from 'pinia';
import './style.scss';
import App from './App.vue';
// import components from './components/UI/indexUI';
import router from './router/router';

const firebaseConfig = {
  apiKey: 'AIzaSyDeXYh-N9ZcysjHx3inkV2zH1OwgaquY-c',
  authDomain: 'vue-jwt-firebase-2084a.firebaseapp.com',
  projectId: 'vue-jwt-firebase-2084a',
  storageBucket: 'vue-jwt-firebase-2084a.appspot.com',
  messagingSenderId: '448116040632',
  appId: '1:448116040632:web:580f02d642d4841b18254d',
};

initializeApp(firebaseConfig);

const app = createApp(App);

// components.forEach((component, index) => {
//   if (component.name) {
//     app.component(component.name, component);
//   } else {
//     app.component(`component${index}`, component);
//   }
// });

app.use(router).use(createPinia()).mount('#app');
