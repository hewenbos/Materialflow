<template>
	<view class="app-main">
		<view class="delay">
			<uni-list :border="false">
				<uni-list-item
					:border="false"
					title="原定时间"
					:right-text="Originaltime"
				></uni-list-item>
				<uni-list-item :border="false" title="延迟时间" showArrow>
					<template v-slot:footer>
						<picker
							mode="time"
							@change="gitDelayTime"
							class="extra-text"
						>
							<view v-if="!delayInfo.delayTime">
								不可超过2个小时
							</view>

							<view v-else :class="{ error: !comTime }"
								>{{ delayInfo.delayTime }}:00</view
							>
						</picker>
					</template>
				</uni-list-item>

				<uni-list-item :border="false" class="area">
					<template v-slot:body>
						<textarea
							class="textarea"
							v-model="delayInfo.delayReason"
							placeholder="请输入延迟提货原因"
						/>
						<text
							class="textNumber"
							:class="{ error: comNumber > 50 }"
							>{{ comNumber }}/50</text
						>
					</template>
				</uni-list-item>
			</uni-list>
			<button class="taskBtn" :disabled="disabled" @click="addDelay">
				提交
			</button>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, computed } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getTaskDelayApi } from '@/api/task'
	const delayInfo = ref({
		delayReason: '',
		delayTime: '',
		id: '',
	})
	const Originaltime = ref('')
	onLoad((e: { id: string; time: string }) => {
		Originaltime.value = e.time
		delayInfo.value.id = e.id
	})

	//获取时间
	const gitDelayTime = (e: CustomEvent) => {
		console.log(e.detail.value)
		const [date] = Originaltime.value.split(' ')
		delayInfo.value.delayTime = `${date} ${e.detail.value}`
	}

	//获取字数
	const comNumber = computed(() => {
		return delayInfo.value.delayReason.length
	})

	//对时间进行校验
	const comTime = computed(() => {
		let start = new Date(Originaltime.value).getTime()

		let end = new Date(delayInfo.value.delayTime).getTime()

		return (
			end / 1000 / 60 / 60 - start / 1000 / 60 / 60 > 0 &&
			end - start < 7200 * 1000
		)
	})

	//验证字符
	const number = computed(() => {
		return comNumber.value <= 50 && comNumber.value > 0
	})

	//对按钮进行校验
	const disabled = computed(() => {
		return !comTime.value || !number.value
	})

	//提交延迟时间
	const addDelay = async () => {
		await getTaskDelayApi(delayInfo.value)
		uni.reLaunch({
			url: '/pages/task/index',
		})
	}
</script>

<style lang="scss">
	.app-main {
		padding: 30rpx;
		.delay {
			padding: 5rpx;
			border-radius: 20rpx;
			background-color: $uni-neutral-whiteColor;
			::v-deep .uni-list-item__content-title {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: $uni-mainBody-fontsize;
				color: $uni-neutral-mainText-color;
			}
			::v-deep .uni-list-item__extra-text {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: $uni-mainBody-fontsize;
				color: $uni-neutral-SecondaryText-color;
			}
			.extra-text {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: $uni-mainBody-fontsize;
				color: $uni-neutral-SecondaryText-color;
			}

			.area {
				position: relative;
				width: 100%;
				.textarea {
					width: 100%;
					height: 260rpx;
					background: $uni-neutral-background;
					border-radius: 16rpx;
					padding: 28rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: $uni-mainBody-fontsize;
					color: $uni-neutral-SecondaryText-color;
				}
				.textNumber {
					position: absolute;
					right: 50rpx;
					bottom: 30rpx;
				}
			}

			::v-deep .uni-icon-wrapper {
				padding: 0 5rpx;
			}
			.taskBtn {
				width: 414rpx;
				height: 100rpx;
				background: $uni-main-primary;
				border-radius: 50rpx;
				margin: 0 auto;
				font-weight: 400;
				font-size: $uni-title-fontsize;
				color: $uni-neutral-whiteColor;
				line-height: 100rpx;
				margin-top: 40rpx;
				margin-bottom: 30rpx;
			}
			.taskBtn[disabled] {
				background: #fadcd9;
			}
		}
	}
</style>
