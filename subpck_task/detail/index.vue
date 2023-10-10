<template>
	<view class="app-main" v-if="taskDetail">
		<view class="infoList">
			<view class="information">
				<view class="Basic">
					<text class="info">基本信息</text>
					<text class="transportTask"
						>(任务编号:{{ taskDetail.transportTaskId }})</text
					>
				</view>
				<text class="iconfont icon-add"></text>
			</view>
		</view>

		<view class="infoList">
			<view class="information">
				<view class="Basic">
					<text class="info">司机信息</text>
				</view>
				<text
					class="iconfont"
					:class="Driver ? 'icon-Reduction' : 'icon-add'"
					@click="Driver = !Driver"
				></text>
			</view>
			<view v-show="Driver" class="Driverinfor">
				<view class="Licenseplatenumber cart">
					<text class="title">车牌号</text>
					<text class="dose">{{ taskDetail.licensePlate }}</text>
				</view>
				<view class="DriverName cart">
					<text class="title">司机姓名</text>
					<text class="dose">{{ taskDetail.driverName }}</text>
				</view>
			</view>
		</view>

		<view class="infoList">
			<view class="information">
				<view class="Basic">
					<text class="info">运输路线</text>
				</view>
				<text
					class="iconfont"
					:class="transport ? 'icon-Reduction' : 'icon-add'"
					@click="transport = !transport"
				></text>
			</view>
			<view v-show="transport" class="Transportroute">
				<view class="Startingplace cart">
					<text class="title">{{ taskDetail.startProvince }}</text>
					<text class="dose">{{ taskDetail.startCity }}</text>
				</view>
				<text class="iconfont icon-Right"></text>
				<view class="destination cart">
					<text class="title">{{ taskDetail.endProvince }}</text>
					<text class="dose">{{ taskDetail.endAddress }}</text>
				</view>
			</view>
		</view>

		<view class="infoList">
			<view class="information">
				<view class="Basic">
					<text class="info">提货信息</text>
				</view>
				<text
					class="iconfont"
					:class="Takedelivery ? 'icon-Reduction' : 'icon-add'"
					@click="Takedelivery = !Takedelivery"
				></text>
			</view>
			<view v-show="Takedelivery" class="Deliveryinformation cart">
				<view class="Receiptvoucher">
					<text class="title">回单凭证</text>
					<view class="ReceiptImg">
						<image
							v-for="(
								item, index
							) in taskDetail.cargoPickUpPictureList"
							:key="index"
							:src="item.url"
							class="img"
							mode=""
						></image>
					</view>
				</view>

				<view class="product cart">
					<text class="title">货品照片</text>
					<view class="ReceiptImg">
						<image
							class="img"
							v-for="(item, index) in taskDetail.cargoPictureList"
							:key="index"
							:src="item.url"
							mode=""
						></image>
					</view>
				</view>
			</view>
		</view>
		<view class="infoList">
			<view class="information">
				<view class="Basic">
					<text class="info">交货信息</text>
				</view>
				<text
					class="iconfont"
					:class="Delivery ? 'icon-Reduction' : 'icon-add'"
					@click="Delivery = !Delivery"
				></text>
			</view>
			<view v-show="Delivery" class="Deliveryinformation cart">
				<view class="Receiptvoucher">
					<text class="title">回单凭证</text>
					<view class="ReceiptImg">
						<image
							v-for="(
								item, index
							) in taskDetail.cargoPickUpPictureList"
							:key="index"
							:src="item.url"
							class="img"
							mode=""
						></image>
					</view>
				</view>

				<view class="product cart">
					<text class="title">货品照片</text>
					<view class="ReceiptImg">
						<image
							class="img"
							v-for="(item, index) in taskDetail.cargoPictureList"
							:key="index"
							:src="item.url"
							mode=""
						></image>
					</view>
				</view>
			</view>
		</view>
		<view class="infoList">
			<view class="information">
				<view class="Basic">
					<text class="info">物品信息</text>
				</view>
				<text class="iconfont icon-add"></text>
			</view>
		</view>
		<view class="infoList">
			<view class="information">
				<view class="Basic">
					<text class="info">异常信息</text>
				</view>
				<text
					class="iconfont"
					:class="abnormal ? 'icon-Reduction' : 'icon-add'"
					@click="abnormal = !abnormal"
				></text>
			</view>
			<view
				v-show="abnormal"
				class="abnormalCart"
				v-for="(item, index) in taskDetail.exceptionList"
				:key="index"
			>
				<view class="cart">
					<text class="title">上报时间</text>
					<text class="dose">{{ item.exceptionTime }}</text>
				</view>
				<view class="cart">
					<text class="title">异常类型</text>
					<text class="dose">{{ item.exceptionType }}</text>
					<text class="iconfont icon-left"></text>
				</view>
				<view class="cart">
					<text class="title">处理结果</text>
					<text class="dose">{{ item.handleResult }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	import { getTaskDetailApi } from '@/api/task'
	import type { TaskDetailResponse } from '@/types/task'

	const id = ref('')

	//获取任务详情数据
	const taskDetail = ref<TaskDetailResponse>()
	const getTaskDetail = async () => {
		const result = await getTaskDetailApi(id.value)
		console.log(result.data.data)
		taskDetail.value = result.data.data
	}
	onLoad((e: { id: string; type: string }) => {
		id.value = e.id
		getTaskDetail()
	})

	//异常的显示和隐藏 false 为隐藏 true 为显示
	const abnormal = ref(false)

	//交货的显示和隐藏 false 为隐藏 true 为显示
	const Delivery = ref(false)

	//提货的显示和隐藏 false 为隐藏 true 为显示
	const Takedelivery = ref(false)

	//运输的显示和隐藏 false 为隐藏 true 为显示
	const transport = ref(false)

	//司机的显示和隐藏 false 为隐藏 true 为显示
	const Driver = ref(false)
</script>

<style lang="scss">
	.app-main {
		padding: 30rpx;
		box-sizing: border-box;
		height: calc(100vh - 45px);
		overflow: scroll;
		.infoList {
			background-color: $uni-neutral-whiteColor;
			border-radius: 20rpx;
			margin-bottom: 30rpx;
			padding: 30rpx 40rpx;
			.information {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 60rpx;
				.info {
					font-family: PingFangSC-Medium;
					font-weight: 600;
					font-size: $uni-title-fontsize;
					color: $uni-neutral-mainText-color;
					margin-right: 10rpx;
				}
				.transportTask {
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 24rpx;
					color: #818181;
				}

				.icon-add {
					font-size: 45rpx;
					font-weight: 600;
				}
				.icon-Reduction {
					font-size: 45rpx;
					font-weight: 600;
				}
			}

			.Driverinfor {
				.cart {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.title {
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: $uni-mainBody-fontsize;
						color: $uni-neutral-SecondaryText-color;
					}
					.dose {
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: $uni-mainBody-fontsize;
						color: $uni-neutral-mainText-color;
					}
				}
				.Licenseplatenumber {
					margin: 28rpx 0rpx;
				}
			}

			.Transportroute {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 40rpx 0;
				.cart {
					display: flex;
					align-items: center;
					flex-direction: column;
					width: 200rpx;
					text-align: center;
					.title {
						font-family: PingFangSC-SNaNrpxibold;
						font-weight: 600;
						font-size: $uni-title-fontsize;
						color: $uni-neutral-mainText-color;
					}
					.dose {
						width: 100%;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: $uni-mainBody-fontsize;
						color: $uni-neutral-mainText-color;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						display: inline-block;
						margin-top: 6rpx;
					}
				}

				.icon-Right {
					font-size: 65rpx;
					color: $uni-neutral-SecondaryText-color;
				}
			}

			.Deliveryinformation {
				.Receiptvoucher {
					margin-top: 51rpx;
				}
				.product {
					margin-top: 51rpx;
				}
				.ReceiptImg {
					margin-top: 32rpx;
					.img {
						width: 191.34rpx;
						height: 191.34rpx;
						border-radius: 10rpx;
					}
				}
				.title {
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: $uni-mainBody-fontsize;
					color: $uni-neutral-SecondaryText-color;
				}
			}

			.abnormalCart {
				border-bottom: 1rpx solid $uni-neutral-background;
				padding: 10rpx 0;
				.cart {
					display: flex;
					align-items: center;
					margin: 36rpx 0;
					.title {
						font-weight: 400;
						font-size: $uni-mainBody-fontsize;
						color: $uni-neutral-mainText-color;
						margin-right: 33rpx;
					}
					.dose {
						font-weight: 400;
						font-size: $uni-mainBody-fontsize;
						color: $uni-neutral-SecondaryText-color;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					.icon-left {
						flex: 1;
						text-align: right;
						color: $uni-neutral-SecondaryText-color;
					}
				}
			}
		}
	}
</style>
