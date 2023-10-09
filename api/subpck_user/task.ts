import uniFetch from '@/utils/request'
import type { responseData } from '@/types/request'
import type { trucktype } from '@/types/subpck_user/subpck'
//获取车辆信息
export const getTruckApi = () => {
	return uniFetch<responseData<trucktype>>({
		url: '/driver/users/truck',
		method: 'GET',
	})
}
