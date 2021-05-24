import { reportTypes } from "../types"
import reportApi, { reportAPI } from "../Api/reportAPI"

export class reportActions {
	reportApi: reportAPI

	constructor(reportApi: reportAPI) {
		this.reportApi = reportApi
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

	successGetReports = (data) => ({
		type: reportTypes.FETCH_ALL_SUCCESS,
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
}

export default new reportActions(reportApi)
