import { getTaskCargApi } from '@/api/task'
import type { responseData } from '@/types/request'
import type { cargoResponseType } from '@/types/task'

export const Debouncing = (
	callBack: (data: responseData<cargoResponseType>) => void
) => {
	let time: any

	return (e: CustomEvent, id: string) => {
		clearTimeout(time)
		console.log(id)
		time = setTimeout(async () => {
			const data = await getTaskCargApi({
				page: 1,
				pageSize: 10,
				taskId: id,
				transportOrderId: e.detail.value,
			})
			callBack(data.data)
		}, 600)
	}
}
