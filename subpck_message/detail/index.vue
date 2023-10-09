<template>
	<view>详情 </view>
</template>

<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app'
	import { getMessageMarkReadApi } from '@/api/message'
	import { ref } from 'vue'

	const id = ref('')
	const getMessageMarkRead = async () => {
		await getMessageMarkReadApi(id.value)
	}
	onLoad((e: { id: string; type: string }) => {
		id.value = e.id
		getMessageMarkRead()
	})
</script>

<style></style>
