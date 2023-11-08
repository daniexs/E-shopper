
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App)
const pinia = createPinia()

app.use(vue3GoogleLogin, {
  clientId:
    '146819948875-q1g0ctcbi5psne38i8fq598hp9bvcrs9.apps.googleusercontent.com',
});

pinia.use(({ store }) => {
    store.$router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')
