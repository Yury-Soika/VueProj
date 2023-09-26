import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from './router/router'
import directives from '@/directives'

const app = createApp(App)

app.use(createPinia())
app.use(router)
directives.forEach((directive: any) => {
  app.directive(directive.name, directive)
})
app.mount('#app')
