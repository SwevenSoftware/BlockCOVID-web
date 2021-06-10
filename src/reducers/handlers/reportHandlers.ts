import { reportTypes, ERROR_UNKNOWN, ERROR_REPORT_NOT_FOUND } from "../../types"

export const reportHandlers = {}

reportHandlers[reportTypes.CREATE_USAGE_SUCCESS] = function (state, action) {
	return {
		...state,
		error: "",
	}
}

reportHandlers[reportTypes.CREATE_CLEANER_SUCCESS] = function (state, action) {
	return {
		...state,
		error: "",
	}
}

reportHandlers[reportTypes.FETCH_SINGLE_SUCCESS] = function (state, action) {
	return {
		...state,
		error: "",
	}
}

reportHandlers[reportTypes.FETCH_ALL_SUCCESS] = function (state, action) {
	return {
		reports: action.payload?._embedded?.reportInformationList,
		error: "",
	}
}

reportHandlers[reportTypes.CREATE_USAGE_FAILURE] = function (state, action) {
	switch (action.payload.error) {
		default:
			return {
				...state,
				error: ERROR_UNKNOWN,
			}
	}
}

reportHandlers[reportTypes.CREATE_CLEANER_FAILURE] = function (state, action) {
	switch (action.payload.error) {
		default:
			return {
				...state,
				error: ERROR_UNKNOWN,
			}
	}
}

reportHandlers[reportTypes.FETCH_SINGLE_FAILURE] = function (state, action) {
	switch (action.payload.error) {
		case 404 /** report does not exist */:
			return {
				...state,
				error: ERROR_REPORT_NOT_FOUND,
			}
		default:
			return {
				...state,
				error: ERROR_UNKNOWN,
			}
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
