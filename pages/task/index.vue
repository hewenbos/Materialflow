<template>
	<view class="app-mains">
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
			<delivery></delivery>
		</view>
		<view class="list" v-show="active == 1" v-if="typeList[1].direct">
			<Enroute></Enroute>
		</view>
		<view class="list" v-show="active == 2" v-if="typeList[2].direct">
			<complete></complete>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import complete from './component/complete.vue'
	import Enroute from './component/Enroute.vue'
	import delivery from './component/delivery.vue'
	const active = ref(0)

	const typeList = ref([
		{
			name: '待提货',
			direct: true,
		},
		{
			name: '在途',
			direct: false,
		},
		{
			name: '已完成',
			direct: false,
		},
	])

	const selectActive = (index: number) => {
		active.value = index
		typeList.value[index].direct = true
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>
