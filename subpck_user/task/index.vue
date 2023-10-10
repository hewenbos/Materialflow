<template>
	<view class="app-main truck-main">
		<view class="swiper">
			<swiper
				v-if="truckInfo"
				:autoplay="true"
				:interval="3000"
				:duration="1000"
			>
				<swiper-item
					v-for="(item, index) in truckInfo.pictureList"
					:key="index"
				>
					<image
						class="truckImg"
						:src="item.url"
						mode="aspectFill"
					></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="list" v-if="truckInfo">
			<uni-list>
				<uni-list-item
					:border="false"
					title="车辆编号"
					:rightText="truckInfo.id"
				></uni-list-item>
				<uni-list-item
					:border="false"
					title="车辆号牌"
					:rightText="truckInfo.licensePlate"
				></uni-list-item>
				<uni-list-item
					:border="false"
					title="车型"
					:rightText="truckInfo.truckType"
				></uni-list-item>
				<uni-list-item
					:border="false"
					title="所属机构"
					:rightText="truckInfo.currentOrganName"
				></uni-list-item>
				<uni-list-item
					:border="false"
					title="载重"
					:rightText="`${truckInfo.allowableLoad}吨`"
				></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { getTruckApi } from '@/api/subpck_user/task'
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	import type { trucktype } from '@/types/subpck_user/subpck'

	const truckInfo = ref<trucktype>()
	const getTruck = async () => {
		const res = await getTruckApi()
		console.log(res.data.code)
		if (res.data.code == 200) {
			truckInfo.value = res.data.data
		}
	}

	onLoad(() => {
		getTruck()
	})
</script>

<style lang="scss">
	.truck-main {
		padding: 0 30rpx;
	}
	.swiper {
		padding-top: 30rpx;
		width: 100%;
		.truckImg {
			width: 100%;
			height: 100%;
		}
	}

	::v-deep.uni-list {
		border-radius: 20rpx;
		background-color: $uni-neutral-whiteColor;
		margin-top: 30rpx;
		padding: 5rpx;
	}
	::v-deep .uni-list-item__content-title {
		color: $uni-neutral-SecondaryText-color;
		font-size: $uni-mainBody-fontsize;
	}

	.app-main {
		/* #ifdef APP */
		// height: calc(100vh - 34px);
		height: 100vh;
		/* #endif */
		height: calc(100vh - 44px);
	}
</style>
