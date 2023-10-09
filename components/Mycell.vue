<template>
	<view class="cell" @click="goRoute">
		<text class="info">{{ title }}</text>
		<text class="iconfont icon-left"></text>
	</view>
</template>

<script lang="ts" setup>
	import { defineProps } from 'vue'
	const { title, to } = defineProps<{
		title: string
		to: string
	}>()

	const goRoute = () => {
		uni.navigateTo({
			url: to,
		})
	}
</script>

<style lang="scss">
	.cell {
		width: 100%;
		height: 120rpx;
		background-color: $uni-neutral-whiteColor;
		border-bottom: 1rpx solid $uni-neutral-separation-color;
		line-height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.info {
			font-size: $uni-title-fontsize;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 32rpx;
			color: $uni-neutral-mainText-color;
			letter-spacing: 0.36rpx;
		}
		.icon-left {
			font-size: 50%;
			color: $uni-neutral-SecondaryText-color;
		}
	}
</style>
