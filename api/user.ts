import uniFetch from '@/utils/request'
import type {
	userInfoResponse,
	MonthTaskType,
	MonthTaskResponse,
} from '@/types/user'
import type { responseData } from '@/types/request'

//获取用户信息
export const getUserInfoApi = () => {
	return uniFetch<userInfoResponse>({
		url: '/driver/users',
		method: 'GET',
	})
}

//获取本月任务
export const getMonthTaskApi = (data: MonthTaskType) => {
	return uniFetch<responseData<MonthTaskResponse>>({
		url: '/driver/users/taskReport',
		method: 'GET',
		data,
	})
}
