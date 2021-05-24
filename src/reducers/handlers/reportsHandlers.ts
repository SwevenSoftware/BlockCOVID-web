import { reportTypes, ERROR_UNKNOWN } from "../../types"

export const reportsHandlers = {}

reportsHandlers[reportTypes.FETCH_ALL_SUCCESS] = function (state, action) {
	return {
		reports: action.payload?._embedded?.reportInformationList,
		error: "",
	}
}

reportsHandlers[reportTypes.FETCH_ALL_FAILURE] = function (state, action) {
	switch (action.payload.error) {
		default:
			return {
				...state,
				error: ERROR_UNKNOWN,
			}
	}
}
