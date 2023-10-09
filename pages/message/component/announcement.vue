<template>
	<scroll-view
		:refresher-enabled="true"
		class="scroll-view"
		refresher-background="#f4f4f4"
		scroll-y="true"
		@scrolltolower="scrolltolower"
		@refresherrefresh="refresherrefresh"
		:refresher-triggered="refresher"
	>
		<view class="announcement" v-if="MessageList.length > 0">
			<view class="Allread">
				<text class="iconfont icon-clear"></text>
				<text @click="allRead">全部已读</text>
			</view>

			<uni-list>
				<uni-list-item
					:title="item.content"
					:rightText="item.created"
					:ellipsis="1"
					v-for="item in MessageList"
					:key="item.id"
					:to="`/subpck_message/detail/index?id=${
						item.id
					}&type=${'200'}`"
				>
					<template v-slot:header>
						<view class="lod" v-if="item.isRead === 0"></view>
					</template>
				</uni-list-item>
			</uni-list>

			<view class="toops" v-if="istext"> {{ text }} </view>
		</view>

		<view v-else class="footer">
			<image src="../../../static/images/kong.png" mode=""></image>
			<text>暂无数据</text>
		</view>
	</scroll-view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { getMessageListApi, getMessageAllReadApi } from '@/api/message'
	import { onLoad } from '@dcloudio/uni-app'
	import type { MessageListType, itemsData } from '@/types/message'
	const MessageListData = ref<MessageListType>({
		contentType: '200',
		page: 1,
		pageSize: 5,
	})

	const MessageList = ref<itemsData[]>([])

	const getMessageList = async () => {
		try {
			const res = await getMessageListApi(MessageListData.value)

			MessageList.value = [
				...MessageList.value,
				...(res.data.data.items || []),
			]

			refresher.value = false
			if (MessageList.value.length >= res.data.data.counts) {
				isscrolltolower.value = true
				text.value = '暂无更多数据'
			} else {
				MessageListData.value.page++
			}

			istext.value = false
		} catch (e) {
			//TODO handle the exception
			console.log(e)
		}
	}

	onLoad(() => {
		getMessageList()
	})

	//上拉加载
	const isscrolltolower = ref(false)
	const text = ref('加载数据中...')
	const istext = ref(false)
	const scrolltolower = () => {
		istext.value = true
		if (isscrolltolower.value) return
		getMessageList()
	}

	//下拉刷新
	const refresher = ref(true)
	const refresherrefresh = () => {
		MessageList.value = []
		MessageListData.value.page = 1
		refresher.value = true
		getMessageList()
	}

	//全部已读

	const allRead = async () => {
		await getMessageAllReadApi('200')
	}
</script>

<style lang="scss">
	@import './announcement.scss';
</style>
