<template>
	<view class="app-main">
		<view class="tab">
			<view
				class="tab-item"
				v-for="(item, index) in typeList"
				:key="index"
				@click="selectActive(index)"
				:class="{ active: active === index }"
			>
				<text>{{ item.name }}</text>
			</view>
		</view>

		<view class="list" v-show="active == 0" v-if="typeList[0].direct">
			<announcement></announcement>
		</view>
		<view class="list" v-show="active == 1" v-if="typeList[1].direct">
			<notification></notification>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import notification from './component/notification.vue'
	import announcement from './component/announcement.vue'
	const active = ref(0)

	const typeList = ref([
		{
			name: '公告',
			direct: true,
		},
		{
			name: '任务通知',
			direct: false,
		},
	])

	const selectActive = (index: number) => {
		active.value = index
		typeList.value[index].direct = true
	}
</script>

<style lang="scss">
	.tab {
		height: 88rpx;
		background-color: $uni-neutral-whiteColor;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.tab-item {
			font-size: $uni-mainBody-fontsize;
			color: $uni-neutral-SecondaryText-color;
			display: flex;
			align-items: center;
			flex-direction: column;
			&.active {
				font-family: PingFangSC-Medium;
				font-weight: 600;
				font-size: 28rpx;
				position: relative;
				color: #2a2929;
				&::after {
					content: '';
					width: 100%;
					position: absolute;
					margin-top: 58rpx;
					height: 8rpx;
					border-radius: 20rpx;
					background-color: $uni-main-primary;
				}
			}
		}
	}
	.app-main {
		height: calc(100vh - 94px);
		.list {
			height: 100%;
		}
	}
</style>
