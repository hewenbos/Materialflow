<template>
	<view class="app-main">
		<view class="navigatorBar">
			<view class="main">
				<view class="user" v-if="userInfo">
					<image
						class="userimg"
						:src="userInfo.avatar"
						mode=""
					></image>
					<view class="nameBox">
						<text class="name">{{ userInfo.name }}</text>
					</view>
					<view class="id">
						<text class="detail"
							>司机编号：{{ userInfo.number }}</text
						>
					</view>
					<view class="phone">
						<text class="detail">手机号：{{ userInfo.phone }}</text>
					</view>
				</view>
			</view>
			<view class="monthQuest">
				<view class="title"> - 本月任务 - </view>
				<view class="questList" v-if="MonthTask">
					<view class="questItem">
						<text class="number">
							{{ MonthTask.taskAmounts }}
						</text>
						<view class="amount"> 任务总量 </view>
					</view>
					<view class="questItem">
						<text class="number">
							{{ MonthTask.completedAmounts }}
						</text>
						<view class="amount"> 完成任务量 </view>
					</view>
					<view class="questItem">
						<text class="number">
							{{ MonthTask.transportMileage }}
						</text>
						<view class="amount"> 运输里程(km) </view>
					</view>
				</view>
			</view>

			<view class="cellBox">
				<MyCell title="车辆信息" to="/subpck_user/task/index"></MyCell>
				<MyCell title="任务数据" to="/subpck_user/tuck/index"></MyCell>
				<MyCell
					title="系统设置"
					to="/subpck_user/settings/index"
				></MyCell>
			</view>
		</view>
	</view>
</template>
<script lang="ts" setup>
	import { ref } from 'vue'
	import MyCell from '@/components/Mycell.vue'
	import { getYearAndTime } from '@/utils/filterTime'
	import { onLoad } from '@dcloudio/uni-app'
	import { getUserInfoApi, getMonthTaskApi } from '@/api/user'
	import type { userInfoData, MonthTaskResponse } from '@/types/user'

	//获取用户信息
	const userInfo = ref<userInfoData>()
	const getUserInfo = async () => {
		const res = await getUserInfoApi()
		userInfo.value = res.data.data
	}

	//获取本月数据
	const MonthTask = ref<MonthTaskResponse>()
	const getMonthTask = async () => {
		const result = await getMonthTaskApi(getYearAndTime())
		console.log(result)
		MonthTask.value = result.data.data
	}
	onLoad(() => {
		getUserInfo()
		getMonthTask()
	})
</script>

<style lang="scss">
	@import './index.scss';
</style>
