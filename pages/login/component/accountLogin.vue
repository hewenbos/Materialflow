<template>
	<uni-forms
		ref="form"
		:modelValue="formData"
		label-width="0rpx"
		:rules="rules"
	>
		<uni-forms-item name="account">
			<uni-easyinput
				type="text"
				v-model="formData.account"
				placeholder="请输入账号"
			/>
		</uni-forms-item>

		<uni-forms-item name="password">
			<uni-easyinput
				type="password"
				v-model="formData.password"
				placeholder="请输入密码"
			/>
		</uni-forms-item>
	</uni-forms>

	<button
		class="loginBtn"
		:disabled="!formData.password || !formData.account"
		@click="submit"
	>
		登录
	</button>
</template>

<script setup lang="ts">
	import { reactive, ref } from 'vue'
	import { getLoginAccountApi } from '@/api/login'
	import { useUserStore } from '@/stores/user'
	import { onLoad } from '@dcloudio/uni-app'

	const redirectTo = ref()
	const pathType = ref()
	onLoad((e: { redirectTo: string; pathType: string }) => {
		redirectTo.value = e.redirectTo
		pathType.value = e.pathType
	})

	const user = useUserStore()
	const formData = reactive({
		password: '',
		account: '',
	})

	const rules = reactive({
		password: {
			rules: [
				{
					required: true,
					errorMessage: '请输入密码',
				},
				{
					pattern: /^\d{6}$/,
					errorMessage: '密码的长度应为6位数字',
				},
			],
		},
		account: {
			rules: [
				{
					required: true,
					errorMessage: '请输入账号',
				},
				{
					pattern: /^[A-z0-9]{5,8}$/,
					errorMessage: '账号的长度应为5 至 8位',
				},
			],
		},
	})
	const form = ref()
	const submit = async () => {
		try {
			const reslust = await form.value.validate()
			const { data } = await getLoginAccountApi(reslust)
			console.log(reslust)
			console.log(data)

			user.token = data.data

			if (data.code === 200) {
				// uni.utils.Toast(data.msg)
				if (pathType.value) {
					uni[pathType.value]({
						url: redirectTo.value,
					})
				} else {
					uni.switchTab({
						url: '/pages/task/index',
					})
				}
			}
		} catch (e) {
			console.log(e)
		}
	}
</script>

<style lang="scss" scoped>
	@import './accountLogin.scss';
</style>
