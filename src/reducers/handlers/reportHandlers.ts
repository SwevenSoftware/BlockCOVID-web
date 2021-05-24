import { reportTypes, ERROR_UNKNOWN } from "../../types"

export const reportHandlers = {}

reportHandlers[reportTypes.FETCH_ALL_SUCCESS] = function (state, action) {
	return {
		reports: action.payload?._embedded?.reportInformationList,
		error: "",
	}
}

reportHandlers[reportTypes.FETCH_ALL_FAILURE] = function (state, action) {
	switch (action.payload.error) {
		default:
			return {
				...state,
				error: ERROR_UNKNOWN,
			}
	}
}
