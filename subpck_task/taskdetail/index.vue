<template>
	<view class="app-main" v-if="taskDetail">
		<scroll-view scroll-y="true">
			<view class="scroll">
				<view class="infoList">
					<view class="information">
						<view class="Basic">
							<text class="info">基本信息</text>
							<text class="transportTask">
								(任务编号:{{ taskDetail.transportTaskId }})
							</text>
						</view>
						<text
							class="iconfont"
							:class="Basics ? 'icon-Reduction' : 'icon-add'"
							@click="Basics = !Basics"
						></text>
					</view>
					<view v-show="Basics" class="Basics">
						<view class="address">
							<view class="start line">
								{{ taskDetail.startAddress }}
							</view>
							<view class="end line">
								{{ taskDetail.endAddress }}
							</view>
						</view>

						<view class="border"> </view>
						<uni-list :border="false">
							<uni-list-item
								:border="false"
								title="联系人"
								:rightText="taskDetail.startHandoverName"
							></uni-list-item>
							<uni-list-item :border="false" title="联系电话">
								<template v-slot:footer>
									{{ taskDetail.startHandoverPhone }}
									<text class="iconfont icon-phone"></text>
								</template>
							</uni-list-item>
							<uni-list-item
								:border="false"
								title="提货时间"
								:rightText="taskDetail.planDepartureTime"
							></uni-list-item>
							<uni-list-item
								:border="false"
								title="预计送达时间"
								:rightText="taskDetail.planArrivalTime"
							>
							</uni-list-item>
						</uni-list>
					</view>
				</view>

				<view class="infoList">
					<view class="information">
						<view class="Basic">
							<text class="info">车辆司机信息</text>
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
							<text class="dose">{{
								taskDetail.licensePlate
							}}</text>
						</view>
						<view class="DriverName cart">
							<text class="title">司机姓名</text>
							<text class="dose">{{
								taskDetail.driverName
							}}</text>
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
							<text class="title">{{
								taskDetail.startProvince
							}}</text>
							<text class="dose">{{ taskDetail.startCity }}</text>
						</view>
						<text class="iconfont icon-Right"></text>
						<view class="destination cart">
							<text class="title">{{
								taskDetail.endProvince
							}}</text>
							<text class="dose">{{
								taskDetail.endAddress
							}}</text>
						</view>
					</view>
				</view>

				<view class="infoList">
					<view class="information">
						<view class="Basic">
							<text class="info">货物信息</text>
							<text class="transportTask">
								{{ `共计 ${cargoCount} 单` }}
							</text>
						</view>

						<text
							class="iconfont"
							:class="cargo ? 'icon-Reduction' : 'icon-add'"
							@click="cargo = !cargo"
						>
						</text>
					</view>

					<view v-show="cargo" class="cargo">
						<view class="shearBox">
							<text class="iconfont icon-search"></text>
							<input
								class="search"
								type="text"
								placeholder="输入运单号"
								@input="
									shearEvent(
										$event,
										taskDetail.transportTaskId
									)
								"
							/>
						</view>

						<view class="cargoList">
							<scroll-view
								@scrolltolower="onScrolltolower"
								scroll-y="true"
							>
								<view class="list">
									<view
										class="item"
										v-for="item in cargoList"
										:key="item.id"
									>
										<text>{{ item.id }}</text>
										<text>{{ item.count }}件</text>
										<text> {{ item.totalWeight }}kg </text>
									</view>
								</view>

								<view
									style="
										text-align: center;
										margin-top: 15rpx;
									"
									v-if="istolower"
								>
									<text class="textTips">{{ isText }}</text>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="footerbtn" v-if="taskDetail.status !== 3">
			<view class="Put" v-if="taskDetail.status === 1">
				<navigator
					:url="`/subpck_task/Delay/index?id=${taskDetail.id}&time=${taskDetail.planDepartureTime}`"
				>
					<view class="putoff"> 延迟提货 </view>
				</navigator>
				<view class="delivery">提货 </view>
			</view>
			<view class="Put" v-if="taskDetail.status === 2">
				<view class="putoff">上报异常</view>
				<view class="delivery">交付 </view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	import { getTaskDetailApi, getTaskCargApi } from '@/api/task'
	import type { TaskDetailResponse, cargoItem } from '@/types/task'
	import { Debouncing } from '@/utils/Debouncing'
	const id = ref('')

	//获取任务详情数据
	const taskDetail = ref<TaskDetailResponse>()
	const getTaskDetail = async () => {
		const result = await getTaskDetailApi(id.value)
		console.log(result.data.data)
		taskDetail.value = result.data.data
	}

	//运输的显示和隐藏 false 为隐藏 true 为显示
	const transport = ref(false)

	//司机的显示和隐藏 false 为隐藏 true 为显示
	const Driver = ref(false)

	//基本信息的显示和隐藏 false 为隐藏 true 为显示
	const Basics = ref(false)

	//获取货物详情
	const cargo = ref(false)
	const cargoData = ref({
		page: 1,
		pageSize: 10,

		transportOrderId: '',
	})

	const cargoList = ref<cargoItem[]>([])

	//货单总数
	const cargoCount = ref<string | number>('')
	const getTaskCarg = async (id: string) => {
		const res = await getTaskCargApi({ ...cargoData.value, taskId: id })

		if (cargoList.value.length >= res.data.data.counts) {
			istolower.value = true
			isText.value = '暂无更多数据'
		} else {
			cargoData.value.page++
		}

		cargoList.value = [...cargoList.value, ...(res.data.data.items || [])]
		cargoCount.value = res.data.data.counts
	}

	onLoad(async (e: { id: string; type: string }) => {
		id.value = e.id
		await getTaskDetail()
		getTaskCarg(taskDetail.value.transportTaskId)
	})

	//自定义上拉加载
	const istolower = ref(false)
	//自定义加载文字
	const isText = ref('')
	const onScrolltolower = () => {
		if (istolower.value) return
		getTaskCarg(taskDetail.value.transportTaskId)
	}

	//搜索货物
	const shearEvent = Debouncing((data) => {
		cargoList.value = data.data.items
	})
</script>

<style lang="scss">
	.app-main {
		height: calc(100vh - 45px);

		::v-deep .uni-scroll-view {
			height: calc(100vh - 115px);
			overflow: hidden;
			box-sizing: border-box;
			.scroll {
				padding: 30rpx;
			}
		}

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
			.Basics {
				.address {
					margin: 42rpx 0;
					margin-left: 17rpx;
					position: relative;
					border-left: 2rpx dashed $uni-main-primary;
					.icon-phone {
						margin-top: 5rpx;
						margin-left: 5rpx;
					}
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
				.border {
					height: 2rpx;
					background-color: $uni-neutral-background;
				}
				::v-deep .uni-list-item__container {
					padding-left: 0;
					padding-right: 0;
				}
				::v-deep .uni-list-item__content-title {
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: $uni-mainBody-fontsize;
					color: $uni-neutral-SecondaryText-color;
				}

				::v-deep .uni-list-item__extra-text {
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: $uni-mainBody-fontsize;
					color: $uni-neutral-mainText-color;
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

			.cargo {
				.shearBox {
					display: flex;
					align-items: center;
					position: relative;
					margin-top: 34rpx;
					.search {
						width: 100%;
						height: 64rpx;
						background: #f4f4f4;
						border-radius: 32rpx;
						box-sizing: border-box;
						padding-left: 75rpx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: 24rpx;
						color: $uni-neutral-SecondaryText-color;
					}
					.icon-search {
						position: absolute;
						left: 26rpx;
						top: 16rpx;
						font-size: 36rpx;
						color: $uni-neutral-SecondaryText-color;
					}
				}
				.cargoList {
					margin-top: 15rpx;
					height: 437rpx;

					::v-deep uni-scroll-view {
						height: 100%;
						overflow: hidden;
					}

					.list {
						.item {
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 30rpx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							font-size: $uni-mainBody-fontsize;
							color: $uni-neutral-mainText-color;
						}
					}
					.textTips {
						text-align: center;
						color: $uni-neutral-SecondaryText-color;
					}
				}
			}
		}
	}

	.footerbtn {
		height: 140rpx;
		background: #ffffff;
		box-shadow: 0 4rpx 16rpx 0 #a2a2a240;
		display: flex;
		padding: 0 30rpx;
		align-items: center;
		.Put {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.putoff {
				width: 250rpx;
				height: 100rpx;
				background: #e6e6e6;
				border-radius: 50rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 32rpx;
				color: $uni-neutral-mainText-color;
				letter-spacing: 0.36rpx;
				line-height: 100rpx;
				text-align: center;
			}
			.delivery {
				width: 414rpx;
				height: 100rpx;
				background: $uni-main-primary;
				border-radius: 50rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 32rpx;
				color: $uni-neutral-whiteColor;
				letter-spacing: 0.36rpx;
				line-height: 100rpx;
				text-align: center;
			}
		}
	}
</style>
