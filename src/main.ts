import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/main.css'
import QRCodeButton from '@/components/QRCodeButton.vue'

const app = createApp(App)

app.use(router)
app.component('QRCodeButton', QRCodeButton)

app.mount('#app')
