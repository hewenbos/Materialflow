import { createPersistedState } from 'pinia-plugin-persistedstate'

const piniaPluginPersistedstate = createPersistedState({
	key: (id: string) => `_Materialflow_${id}`,

	storage: {
		getItem(key: string) {
			return uni.getStorageSync(key)
		},
		setItem(key: string, value: any) {
			console.log(key)
			uni.setStorageSync(key, value)
		},
	},
})

export default piniaPluginPersistedstate
