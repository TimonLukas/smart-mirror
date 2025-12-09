import './assets/main.css'
import { add } from '@smart-mirror/lib-common/foo'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

console.log('1 + 2 =', add(1, 2))

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
