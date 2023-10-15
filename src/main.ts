import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from './pages/router/router'
import directives from '@/modules/Post/directives'

const app = createApp(App)

app.use(createPinia())
app.use(router)
directives.forEach((directive) => {
  app.directive(directive.name, directive)
})
app.mount('#app')
