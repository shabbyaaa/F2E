import { createApp } from 'vue'
import App from './App.vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

createApp(App).use(mavonEditor).mount('#app')
