import type { MonthTaskType } from '@/types/user'
export const getYearAndTime = (): MonthTaskType => {
	const date = new Date()

	let year = date.getFullYear()
	let month = String(date.getMonth() + 1)

	if (month.length < 2) {
		month = '0' + month
	}

	return {
		year,
		month,
	}
}
