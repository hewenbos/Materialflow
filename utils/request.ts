import { createUniFetch } from 'uni-app-fetch'
import type { responseData } from '@/types/request'
import { useUserStore } from '@/stores/user'

const whitList = ['pages/message/index', 'pages/task/index', 'pages/my/index']
// import utils from '@/utils/utils'
// 使用自定义选项创建实例
const uniFetch = createUniFetch<responseData>({
	loading: { title: '加载中...' },
	baseURL: 'https://slwl-api.itheima.net',
	intercept: {
		// 请求拦截器
		request(options) {
			const store = useUserStore()

			const responseHeader = {
				Authorization: store.token,
			}

			options.header = Object.assign({}, responseHeader, options.header)
			return options
		},
		// 响应拦截器
		response(response: any) {
			console.log(response)
			if (response.statusCode === 200 && response.data.code === 200) {
				return response
			}

			if (response.statusCode === 401) {
				const PathRouteList = getCurrentPages()

				const redirectTo = PathRouteList[PathRouteList.length - 1].route
				console.log(redirectTo)

				const pathType = whitList.includes(redirectTo)
					? 'switchTab'
					: 'redirectTo'
				return uni.navigateTo({
					url: `/pages/login/login?redirectTo=/${redirectTo}&pathType=${pathType}`,
				})
			}

			uni.utils.Toast(response.data.msg || '请求失败')
		},
	},
})

// 模块导出
export default uniFetch
