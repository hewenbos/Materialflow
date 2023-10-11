import uniFetch from '@/utils/request'
import type {
	TaskDetailResponse,
	taskListType,
	taskData,
	cargoType,
	cargoResponseType,
} from '@/types/task'
import type { responseData } from '@/types/request'

// 任务详情
export const getTaskDetailApi = (id: string) => {
	return uniFetch<responseData<TaskDetailResponse>>({
		url: `/driver/tasks/details/${id}`,
		method: 'GET',
	})
}

//任务列表
export const getTaskListApi = (data: taskListType) => {
	return uniFetch<responseData<taskData>>({
		url: `/driver/tasks/list?page=${data.page}&pageSize=${data.pageSize}&status=${data.status}`,
		method: 'GET',
	})
}

//获取货物列表
export const getTaskCargApi = (data: cargoType) => {
	return uniFetch<responseData<cargoResponseType>>({
		url: `/driver/tasks/orders?page=${data.page}&pageSize=${
			data.pageSize
		}&taskId=${data.taskId}&transportOrderId=${
			data.transportOrderId || ''
		}`,
		method: 'GET',
	})
}

//延迟时间
export const getTaskDelayApi = (data: {
	delayReason: string
	delayTime: string
	id: string
}) => {
	return uniFetch({
		url: '/driver/tasks/delay',
		method: 'PUT',
		data,
	})
}
