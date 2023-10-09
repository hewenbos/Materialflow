<template>
	<view class="login-main">
		<view class="loginTop">
			<text class="loginMethod">{{ list[isPass].title }}</text>
			<text class="switchaccount" @click="account">
				{{ list[isPass].info }}
			</text>
			<image
				class="loginimg"
				src="../../static/images/jiantou5.png"
				mode=""
			></image>
		</view>
		<view class="loginFrom">
			<accountLogin v-if="isPass === 0"></accountLogin>
		</view>
	</view>
</template>

<script setup lang="ts">
	import accountLogin from './component/accountLogin.vue'
	import { ref } from 'vue'

	const isPass = ref(0)

	const list = ref([
		{
			title: '账号登录',
			info: '手机号登录',
		},
		{
			title: '手机号登录',
			info: '账号登录',
		},
	])

	const account = () => {
		isPass.value = Math.abs(isPass.value - 1)
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
