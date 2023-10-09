import type { toastType } from '@/types/toast'

const utils = {
	Toast(title: string, icon: toastType = 'none') {
		uni.showToast({
			title: title,
			icon: icon,
			mask: true,
		})
	},
}
uni.utils = utils
export default utils
