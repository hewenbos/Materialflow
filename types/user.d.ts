export type userInfoResponse = {
	code: number
	data: userInfoData
	msg: string
}

export type userInfoData = {
	avatar: string
	name: string
	number: string
	phone: string
}

export type MonthTaskType = {
	month: string | number
	year: string | number
}

export type MonthTaskResponse = {
	completedAmounts: number
	dailyMileage: { dateTime: string; mileage: number }[]
	taskAmounts: number
	transportMileage: number
}
