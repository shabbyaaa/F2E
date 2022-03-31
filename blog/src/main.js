import './styles/index.css'
import { createApp } from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import App from './App.vue'
import router from 'router'

createApp(App).use(router).use(mavonEditor).mount('#app')
