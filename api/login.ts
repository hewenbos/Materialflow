import uniFetch from '@/utils/request'
import type { loginData, accountResponse } from '@/types/login'

// 账号登录接口
export const getLoginAccountApi = (data: loginData) => {
	return uniFetch<accountResponse>({
		url: '/driver/login/account',
		method: 'POST',
		data,
	})
}
