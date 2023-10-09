import pinia from './SignInPinia'
import type { App } from 'vue'
export default {
	install(app: App) {
		app.use(pinia)
	},
}
