import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

// 该应用实例是用来在应用中注册‘全局’组件的
// App作为根组件被挂载到应用中，该组件被用作渲染的起点
const app = createApp(App)

app.use(router)
// 与大多数应用方法不同，mount不返回应用本身，相反，他返回的是根组件实例
app.mount('#app')
