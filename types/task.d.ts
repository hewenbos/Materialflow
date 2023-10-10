export type TaskDetailResponse = {
	/**
	 * 实际到达时间
	 */
	actualArrivalTime: string
	/**
	 * 实际发车时间
	 */
	actualDepartureTime: string
	/**
	 * 提货凭证
	 */
	cargoPickUpPictureList: CargoPickUpPictureList[]
	/**
	 * 提货图片
	 */
	cargoPictureList: CargoPictureList[]
	/**
	 * 回单凭证
	 */
	certificatePictureList: CertificatePictureList[]
	/**
	 * 回单图片
	 */
	deliverPictureList: DeliverPictureList[]
	/**
	 * 司机id
	 */
	driverId: string
	/**
	 * 司机姓名
	 */
	driverName: string
	/**
	 * 目的市
	 */
	endAddress: string
	/**
	 * 目的机构id
	 */
	endAgencyId: string
	/**
	 * 目的机构详细地址
	 */
	endCity: string
	/**
	 * 目的省份
	 */
	endProvince: string
	exceptionList: ExceptionList[]
	/**
	 * 交付对接人
	 */
	finishHandoverName: string
	/**
	 * 交付对接人电话
	 */
	finishHandoverPhone: string
	/**
	 * 司机作业单id
	 */
	id: string
	/**
	 * 车牌号码
	 */
	licensePlate: string
	/**
	 * 计划到达时间
	 */
	planArrivalTime: string
	/**
	 * 计划发车时间
	 */
	planDepartureTime: string
	/**
	 * 起始机构详细地址
	 */
	startAddress: string
	/**
	 * 起始机构id
	 */
	startAgencyId: string
	/**
	 * 起始市
	 */
	startCity: string
	/**
	 * 提货对接人
	 */
	startHandoverName: string
	/**
	 * 提货对接人电话
	 */
	startHandoverPhone: string
	/**
	 * 起始省份
	 */
	startProvince: string
	/**
	 * 作业状态，1为待提货）、2为在途）、3为改派）、4为已交付）、5为已作废
	 */
	status: number
	/**
	 * 运输任务id
	 */
	transportTaskId: string
	[property: string]: any
}

export interface CargoPickUpPictureList {
	/**
	 * 图片url地址
	 */
	url: string
	[property: string]: any
}

export interface CargoPictureList {
	/**
	 * 图片url地址
	 */
	url: string
	[property: string]: any
}

export interface CertificatePictureList {
	/**
	 * 图片url地址
	 */
	url: string
	[property: string]: any
}

export interface DeliverPictureList {
	/**
	 * 图片url地址
	 */
	url: string
	[property: string]: any
}

export interface ExceptionList {
	/**
	 * 异常描述
	 */
	exceptionDescribe: string
	/**
	 * 异常图片
	 */
	exceptionImagesList: ExceptionImagesList[]
	/**
	 * 上报的位置
	 */
	exceptionPlace: string
	/**
	 * 异常时间
	 */
	exceptionTime: string
	/**
	 * 异常类型(中文)
	 */
	exceptionType: string
	/**
	 * 处理结果
	 */
	handleResult: string
	[property: string]: any
}

export interface ExceptionImagesList {
	/**
	 * 图片url
	 */
	url: string
	[property: string]: any
}

//任务列表参数
export type taskListType = {
	page: number
	pageSize: number
	status: string
}

/**
 * 响应数据，分页数据统一对象
 */
export type taskData = {
	/**
	 * 总条目数
	 */
	counts: number
	/**
	 * 数据列表
	 */
	items: Itemtask[]
	/**
	 * 页码
	 */
	page: number
	/**
	 * 总页数
	 */
	pages: number
	/**
	 * 页尺寸
	 */
	pageSize: number
	[property: string]: any
}

export type Itemtask = {
	/**
	 * 实际到达时间
	 */
	actualArrivalTime: string
	/**
	 * 实际发车时间
	 */
	actualDepartureTime: string
	/**
	 * 创建时间
	 */
	created: string
	/**
	 * 司机id
	 */
	driverId: string
	/**
	 * 是否可提货
	 */
	enablePickUp: boolean
	/**
	 * 目的机构地址
	 */
	endAddress: string
	/**
	 * 目的机构id
	 */
	endAgencyId: number
	/**
	 * 交付对接人
	 */
	finishHandover: string
	/**
	 * 司机作业单id
	 */
	id: string
	/**
	 * 计划到达时间
	 */
	planArrivalTime: string
	/**
	 * 计划发车时间
	 */
	planDepartureTime: string
	/**
	 * 起始机构地址
	 */
	startAddress: string
	/**
	 * 起始机构id
	 */
	startAgencyId: number
	/**
	 * 提货对接人
	 */
	startHandover: string
	/**
	 * 作业状态，作业状态，1为待提货）、2为在途）、3为改派）、4为已交付）、5为已作废
	 */
	status: string
	/**
	 * 运输任务id
	 */
	transportTaskId: string
	[property: string]: any
}
