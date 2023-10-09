import uniFetch from '@/utils/request'
import type { MessageListType, MessageListResponse } from '@/types/message'
import type { responseData } from '@/types/request'

//根据类型查询未读消息数量
export const getMessagetypeApi = (contentType: string | number) => {
	return uniFetch({
		url: `/driver/messages/countType/${contentType}`,
		method: 'GET',
	})
}

//分页查询消息列表
export const getMessageListApi = (data: MessageListType) => {
	return uniFetch<responseData<MessageListResponse>>({
		url: `/driver/messages/page?contentType=${data.contentType}&page=${data.page}&pageSize=${data.pageSize}`,
		method: 'GET',
	})
}

//全部已读
export const getMessageAllReadApi = (contentType: string | number) => {
	return uniFetch<{
		code: number
		data?: [] | null
		msg: string
	}>({
		url: `/driver/messages/readAll/${contentType}`,
		method: 'PUT',
	})
}

//标记已读
export const getMessageMarkReadApi = (id: string | number) => {
	return uniFetch({
		url: `/driver/messages/${id}`,
		method: 'PUT',
	})
}
