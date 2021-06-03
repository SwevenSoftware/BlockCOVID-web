import { reportTypes } from "../types"
import reportApi, { reportAPI } from "../Api/reportAPI"
import download from "downloadjs"

export class reportActions {
	reportApi: reportAPI

	constructor(reportApi: reportAPI) {
		this.reportApi = reportApi
	}

	getUsage(data: { fromTimestamp: string; toTimestamp: string }) {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			let dataToDispatch = data
			if (!(data?.fromTimestamp && data?.toTimestamp)) {
				let today: Date = new Date()
				let yesterday: Date = new Date()
				yesterday.setDate(today.getDate() - 1)
				let todayDate: string =
					today.getUTCFullYear() +
					"-" +
					(today.getUTCMonth() + 1 < 10
						? "0" + (today.getUTCMonth() + 1)
						: today.getUTCMonth() + 1) +
					"-" +
					(today.getUTCDate() < 10
						? "0" + today.getUTCDate()
						: today.getUTCDate())
				let yesterdayDate: string =
					yesterday.getUTCFullYear() +
					"-" +
					(yesterday.getUTCMonth() + 1 < 10
						? "0" + (yesterday.getUTCMonth() + 1)
						: yesterday.getUTCMonth() + 1) +
					"-" +
					(yesterday.getUTCDate() < 10
						? "0" + yesterday.getUTCDate()
						: yesterday.getUTCDate())
				let todayTime: string =
					(today.getUTCHours() < 10
						? "0" + today.getUTCHours().toString()
						: today.getUTCHours().toString()) +
					":" +
					(today.getUTCMinutes() < 10
						? "0" + today.getUTCMinutes().toString()
						: today.getUTCMinutes().toString())
				let todayString: string = todayDate + "T" + todayTime
				let yesterdayString: string = yesterdayDate + "T" + todayTime
				dataToDispatch = {
					fromTimestamp: yesterdayString,
					toTimestamp: todayString,
				}
			}
			this.reportApi
				.getUsage(tokenID, dataToDispatch)
				.then((res) => {
					download(
						res.data,
						"Report-usage.pdf",
						res.headers["content-type"]
					)
					dispatch(this.successGetUsage(res.data))
					dispatch(this.getReports())
				})
				.catch((err) => {
					dispatch(this.failureGetUsage(err?.response?.status))
				})
		}
	}

	getCleaner() {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			this.reportApi
				.getCleaner(tokenID)
				.then((res) => {
					download(
						res.data,
						"Report-cleaner.pdf",
						res.headers["content-type"]
					)
					dispatch(this.successGetCleaner(res.data))
					dispatch(this.getReports())
				})
				.catch((err) => {
					dispatch(this.failureGetCleaner(err?.response?.status))
				})
		}
	}

	getReports() {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			this.reportApi
				.getReports(tokenID)
				.then((res) => {
					dispatch(this.successGetReports(res.data))
				})
				.catch((err) => {
					dispatch(this.failureGetReports(err?.response?.status))
				})
		}
	}

	getReport(data: { reportName: string }) {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			this.reportApi
				.getReport(tokenID, data)
				.then((res) => {
					download(
						res.data,
						data.reportName,
						res.headers["content-type"]
					)
					dispatch(this.successGetReport(res.data))
				})
				.catch((err) => {
					dispatch(this.failureGetReport(err?.response?.status))
				})
		}
	}

	successGetReports = (data) => ({
		type: reportTypes.FETCH_ALL_SUCCESS,
		payload: {
			...data,
		},
	})

	successGetReport = (data) => ({
		type: reportTypes.FETCH_SINGLE_SUCCESS,
		payload: {
			...data,
		},
	})

	successGetUsage = (data) => ({
		type: reportTypes.CREATE_USAGE_SUCCESS,
		payload: {
			...data,
		},
	})

	successGetCleaner = (data) => ({
		type: reportTypes.CREATE_CLEANER_SUCCESS,
		payload: {
			...data,
		},
	})

	failureGetReports = (error) => ({
		type: reportTypes.FETCH_ALL_FAILURE,
		payload: {
			error,
		},
	})

	failureGetReport = (error) => ({
		type: reportTypes.FETCH_SINGLE_FAILURE,
		payload: {
			error,
		},
	})

	failureGetUsage = (error) => ({
		type: reportTypes.CREATE_USAGE_FAILURE,
		payload: {
			error,
		},
	})

	failureGetCleaner = (error) => ({
		type: reportTypes.CREATE_CLEANER_FAILURE,
		payload: {
			error,
		},
	})
}

export default new reportActions(reportApi)
