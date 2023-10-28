import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import directives from '@/modules/Post/directives'
import { fakeBackend } from '@/helpers/fakeBackend'

fakeBackend()

const app = createApp(App)

app.use(createPinia())
app.use(router)
directives.forEach((directive) => {
  app.directive(directive.name, directive)
})
app.mount('#app')
