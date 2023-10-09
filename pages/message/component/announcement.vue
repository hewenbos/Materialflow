<template>
	<scroll-view class="scroll-view" scroll-y="true">
		<view class="announcement">
			<view class="Allread">
				<text class="iconfont icon-clear"></text>
				<text>全部已读</text>
			</view>

			<uni-list>
				<uni-list-item
					title="在营车辆年检通知，为保障车辆能够111111111"
					rightText="05-06 06:16"
					:ellipsis="1"
				>
					<template v-slot:header>
						<view class="lod"></view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</scroll-view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { getMessageListApi } from '@/api/message'
	import { onLoad } from '@dcloudio/uni-app'
	import type { MessageListType } from '@/types/message'
	const MessageListData = ref<MessageListType>({
		contentType: '200',
		page: 1,
		pageSize: 5,
	})

	const getMessageList = async () => {
		try {
			await getMessageListApi(MessageListData.value)
		} catch (e) {
			//TODO handle the exception
			console.log(e)
		}
	}

	onLoad(() => {
		getMessageList()
	})
</script>

<style lang="scss">
	.announcement {
		.Allread {
			padding: 42rpx 34rpx;
			font-size: $uni-mainBody-fontsize;
			color: $uni-neutral-SecondaryText-color;
			.icon-clear {
				margin-right: 18rpx;
			}
		}

		.uni-list-item {
			position: relative;
			.lod {
				width: 16rpx;
				height: 16rpx;
				background: #ef4f3f;
				border: 2rpx solid #ffffff;
				border-radius: 50%;
				position: absolute;
				left: 10rpx;
				top: 34rpx;
			}
			::v-deep .uni-list-item__content-title {
				margin-left: 10rpx;
				width: 400rpx;
			}
		}
	}

	.scroll-view {
		height: 100%;
	}
</style>
