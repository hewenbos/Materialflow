import uniFetch from '@/utils/request'
import utils from '@/utils/utils'
// #ifdef VUE3
declare module 'vue' {
	interface ComponentCustomProperties {
		fetch: typeof uniFetch
	}
}

// #endif
