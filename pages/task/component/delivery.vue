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
		<view class="Delivery" v-if="taskList.length > 0">
			<view class="itemCart" v-for="item in taskList" :key="item.id">
				<view class="Taskid">
					<view class="task">
						任务编号：<text class="id">{{ item.id }}</text>
					</view>
					<text
						class="Putoff"
						v-if="item.actualDepartureTime != null"
					>
						以延迟
					</text>
				</view>

				<navigator
					hover-class="none"
					:url="`/subpck_task/taskdetail/index?id=${item.id}`"
				>
					<view class="address">
						<view class="start line">
							{{ item.startAddress }}
						</view>
						<view class="end line"> {{ item.endAddress }} </view>
					</view>
				</navigator>

				<view class="footer">
					<view class="time">
						<text class="timer">提货时间</text>
						<view class="date">{{ item.planDepartureTime }}</view>
					</view>
					<navigator
						v-if="item.enablePickUp"
						class="btnadd"
						:url="`/subpck_task/addtask/index?id=${item.id}`"
					>
						<text>提交</text>
					</navigator>
					<text v-else class="disabled">
						<text>提交</text>
					</text>
				</view>
			</view>

			<view class="toops" v-if="istext"> {{ text }} </view>
		</view>
		<view v-else class="footertip">
			<image src="../../../static/images/kong.png" mode=""></image>
			<text>暂无数据</text>
		</view>
	</scroll-view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getTaskListApi } from '@/api/task'
	import type { taskListType, Itemtask } from '@/types/task'
	const taskParams = ref<taskListType>({
		page: 1,
		pageSize: 5,
		status: '1',
	})

	const taskList = ref<Itemtask[]>([])
	const getTaskList = async () => {
		try {
			const result = await getTaskListApi(taskParams.value)
			taskList.value = [
				...taskList.value,
				...(result.data.data.items || []),
			]

			refresher.value = false
			if (taskList.value.length >= result.data.data.counts) {
				isscrolltolower.value = true
				text.value = '暂无更多数据'
			} else {
				taskParams.value.page++
			}

			istext.value = false
		} catch (e) {
			//TODO handle the exception
			console.log(e)
		}
	}

	onLoad(() => {
		getTaskList()
	})

	//上拉加载
	const isscrolltolower = ref(false)
	const text = ref('加载数据中...')
	const istext = ref(false)
	const scrolltolower = () => {
		istext.value = true
		if (isscrolltolower.value) return

		getTaskList()
	}

	//下拉刷新
	const refresher = ref(true)
	const refresherrefresh = () => {
		taskList.value = []
		taskParams.value.page = 1
		refresher.value = true
		getTaskList()
	}

	//跳转详情
</script>

<style lang="scss">
	.scroll-view {
		height: 100%;
		padding: 0 30rpx;

		box-sizing: border-box;
		.Delivery {
			.itemCart {
				background-color: $uni-neutral-whiteColor;
				margin: 30rpx 0;
				padding: 34rpx;
				border-radius: 20rpx;
				.Taskid {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.task {
						font-family: PingFangSC-Medium;
						font-weight: 600;
						font-size: $uni-title-fontsize;
						color: $uni-neutral-mainText-color;
						display: flex;
						align-items: center;
						.id {
							display: inline-block;
							width: 300rpx;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}
					}
					.Putoff {
						width: 104rpx;
						height: 44rpx;
						border: 2rpx solid $uni-main-primary;
						border-radius: 22rpx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: 24rpx;
						color: $uni-main-primary;
						text-align: center;
						line-height: 44rpx;
					}
				}
				.address {
					margin: 42rpx 0;
					margin-left: 17rpx;
					position: relative;
					border-left: 2rpx dashed $uni-main-primary;
					&::before,
					&::after {
						width: 44rpx;
						height: 44rpx;
						border-radius: 22rpx;
						position: absolute;
						left: -22rpx;
						display: flex;
						align-items: center;
						font-family: PingFangSC-Medium;
						font-weight: 500;
						font-size: 24rpx;
						justify-content: center;
						color: $uni-neutral-whiteColor;
					}
					&::after {
						content: '终';
						background-color: $uni-main-primary;
						bottom: -1rpx;
					}
					&::before {
						content: '起';
						background: $uni-neutral-mainText-color;
						top: -1rpx;
					}
					.line {
						margin: 35rpx 0;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: $uni-mainBody-fontsize;
						color: $uni-neutral-SecondaryText-color;
						margin-left: 43rpx;
					}
				}
				.footer {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.time {
						.timer {
							color: $uni-neutral-SecondaryText-color;
							font-size: $uni-mainBody-fontsize;
							font-face: PingFangSC;
							font-weight: 400;
							line-height: 0;
							letter-spacing: 0.32rpx;
							paragraph-spacing: 0;
							text-align: left;
						}
						.date {
							color: $uni-neutral-mainText-color;
							font-size: $uni-mainBody-fontsize;
							font-face: PingFangSC;
							font-weight: 400;

							letter-spacing: 0.32rpx;
							paragraph-spacing: 0;
							text-align: left;
							margin-top: 10rpx;
						}
					}
					.btnadd {
						width: 160rpx;
						height: 64rpx;
						background: $uni-main-primary;
						border-radius: $uni-title-fontsize;
						font-weight: 400;
						font-size: $uni-mainBody-fontsize;
						color: $uni-neutral-whiteColor;
						letter-spacing: 0.32rpx;
						text-align: center;
						line-height: 64rpx;
					}

					.disabled {
						background-color: $uni-neutral-background;
						width: 160rpx;
						height: 64rpx;

						border-radius: $uni-title-fontsize;
						font-weight: 400;
						font-size: $uni-mainBody-fontsize;
						color: $uni-neutral-whiteColor;
						letter-spacing: 0.32rpx;
						text-align: center;
						line-height: 64rpx;
					}
				}
			}
			.toops {
				text-align: center;
				padding: 20rpx 0;
				font-size: $uni-mainBody-fontsize;
				color: $uni-neutral-SecondaryText-color;
			}
		}
		.footertip {
			text-align: center;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			image {
				width: 400rpx;
				height: 240rpx;
			}
			text {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 28rpx;
				color: #818181;
				display: inline-block;
				margin-top: 40rpx;
			}
		}
	}
</style>
