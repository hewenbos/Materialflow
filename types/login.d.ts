//账号登录请求数据
export type loginData = {
	account: string
	password: string
}

//账号登录返回数据
export type accountResponse = {
	msg: string
	data: string
	code: number
}
