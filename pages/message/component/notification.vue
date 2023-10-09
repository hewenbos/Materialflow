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
		<view class="notification" v-if="MessageList.length > 0">
			<view class="Allread">
				<text class="iconfont icon-clear"></text>
				<text @click="allRead">全部已读</text>
			</view>

			<view class="notificationList">
				<uni-list v-for="item in MessageList" :key="item.id">
					<uni-list-item class="header" :ellipsis="1">
						<template v-slot:body>
							<view class="slot-box">
								<text class="slot-text">{{ item.title }}</text>
							</view>
						</template>
						<template v-slot:header>
							<view v-if="item.isRead === 0" class="lod"></view>
						</template>
					</uni-list-item>
					<uni-list-item
						:border="false"
						:title="item.content.split('\n')[0]"
						:rightText="item.content.split('\n')[1]"
						:ellipsis="1"
					>
					</uni-list-item>
					<uni-list-item
						:border="false"
						:title="item.created"
						rightText=""
						:ellipsis="1"
					>
						<template v-slot:footer>
							<button
								plain
								class="btnDetail"
								@click="goDetail(item.id)"
							>
								查看详情
							</button>
						</template>
					</uni-list-item>
				</uni-list>
			</view>

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
		contentType: '201',
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
		await getMessageAllReadApi('201')
	}

	//跳转详情

	const goDetail = (id: string | number) => {
		uni.navigateTo({
			url: `/subpck_message/detail/index?id=${id}&type=${'201'}`,
		})
	}
</script>

<style lang="scss">
	@import './notification.scss';
</style>
