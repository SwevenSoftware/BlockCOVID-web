import reportsReducer, { initialState } from "../../src/reducers/reportReducer"
import {
	ERROR_REPORT_NOT_FOUND,
	ERROR_UNKNOWN,
	reportTypes,
} from "../../src/types"

describe("reports reducer test", function () {
	const fakeReports = {
		_embedded: {
			reportInformationList: [
				{
					name: "Registered_Report_usage_20210523_000000.pdf",
					creationDate: "2021-05-23T00:00:00.028264417",
					registrationDate: "2021-05-23T00:00:00.028264417",
				},
				{
					name: "Registered_Report_usage_20210524_000000.pdf",
					creationDate: "2021-05-24T00:00:00.028264417",
					registrationDate: "2021-05-24T00:00:00.028264417",
				},
			],
		},
	}

	it("should have correct initial state", function () {
		const action = {
			type: null,
		}
		expect(reportsReducer(initialState, action)).toEqual(initialState)
	})

	it("should correctly create and fetch usage report", function () {
		const fakeReport = [
			{
				"0": "first character of the pdf file",
			},
			{
				"1": "second character of the pdf file",
			},
			{
				"2": "third character of the pdf file",
			},
			{
				"3": "fourth character of the pdf file",
			},
		]
		const action = {
			type: reportTypes.CREATE_USAGE_SUCCESS,
			payload: fakeReport,
		}
		expect(reportsReducer(initialState, action)).toEqual(initialState)
	})

	it("should correctly create and fetch cleaner report", function () {
		const fakeReport = [
			{
				"0": "first character of the pdf file",
			},
			{
				"1": "second character of the pdf file",
			},
			{
				"2": "third character of the pdf file",
			},
			{
				"3": "fourth character of the pdf file",
			},
		]
		const action = {
			type: reportTypes.CREATE_CLEANER_SUCCESS,
			payload: fakeReport,
		}
		expect(reportsReducer(initialState, action)).toEqual(initialState)
	})

	it("should correctly fetch single report", function () {
		const fakeReport = [
			{
				"0": "first character of the pdf file",
			},
			{
				"1": "second character of the pdf file",
			},
			{
				"2": "third character of the pdf file",
			},
			{
				"3": "fourth character of the pdf file",
			},
		]
		const action = {
			type: reportTypes.FETCH_SINGLE_SUCCESS,
			payload: fakeReport,
		}
		expect(reportsReducer(initialState, action)).toEqual(initialState)
	})

	it("should correctly fetch all reports", function () {
		const action = {
			type: reportTypes.FETCH_ALL_SUCCESS,
			payload: fakeReports,
		}

		const state = {
			reports: fakeReports._embedded.reportInformationList,
			error: "",
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly fetch all reports even with no reports", function () {
		const action = {
			type: reportTypes.FETCH_ALL_SUCCESS,
			payload: {
				_embedded: {},
			},
		}

		const state = {
			reports: undefined,
			error: "",
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly fetch all reports even with no payload", function () {
		const action = {
			type: reportTypes.FETCH_ALL_SUCCESS,
		}

		const state = {
			reports: undefined,
			error: "",
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle create and fetch usage report error 400", function () {
		const action = {
			type: reportTypes.CREATE_USAGE_FAILURE,
			payload: {
				error: 400,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle create and fetch usage report error 401", function () {
		const action = {
			type: reportTypes.CREATE_USAGE_FAILURE,
			payload: {
				error: 401,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle create and fetch usage report error 404", function () {
		const action = {
			type: reportTypes.CREATE_USAGE_FAILURE,
			payload: {
				error: 404,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle create and fetch usage report error 500", function () {
		const action = {
			type: reportTypes.CREATE_USAGE_FAILURE,
			payload: {
				error: 500,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle create and fetch usage report error 504", function () {
		const action = {
			type: reportTypes.CREATE_USAGE_FAILURE,
			payload: {
				error: 504,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle create and fetch cleaner report error 400", function () {
		const action = {
			type: reportTypes.CREATE_CLEANER_FAILURE,
			payload: {
				error: 400,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle create and fetch cleaner report error 401", function () {
		const action = {
			type: reportTypes.CREATE_CLEANER_FAILURE,
			payload: {
				error: 401,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle create and fetch cleaner report error 404", function () {
		const action = {
			type: reportTypes.CREATE_CLEANER_FAILURE,
			payload: {
				error: 404,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle create and fetch cleaner report error 500", function () {
		const action = {
			type: reportTypes.CREATE_CLEANER_FAILURE,
			payload: {
				error: 500,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle create and fetch cleaner report error 504", function () {
		const action = {
			type: reportTypes.CREATE_CLEANER_FAILURE,
			payload: {
				error: 504,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch single report error 400", function () {
		const action = {
			type: reportTypes.FETCH_SINGLE_FAILURE,
			payload: {
				error: 400,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch single report error 401", function () {
		const action = {
			type: reportTypes.FETCH_SINGLE_FAILURE,
			payload: {
				error: 401,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch single report error 404", function () {
		const action = {
			type: reportTypes.FETCH_SINGLE_FAILURE,
			payload: {
				error: 404,
			},
		}
		const state = {
			...initialState,
			error: ERROR_REPORT_NOT_FOUND,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch single report error 500", function () {
		const action = {
			type: reportTypes.FETCH_SINGLE_FAILURE,
			payload: {
				error: 500,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch single report error 504", function () {
		const action = {
			type: reportTypes.FETCH_SINGLE_FAILURE,
			payload: {
				error: 504,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch all reports error 400", function () {
		const action = {
			type: reportTypes.FETCH_ALL_FAILURE,
			payload: {
				error: 400,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch all reports error 401", function () {
		const action = {
			type: reportTypes.FETCH_ALL_FAILURE,
			payload: {
				error: 401,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch all reports error 404", function () {
		const action = {
			type: reportTypes.FETCH_ALL_FAILURE,
			payload: {
				error: 404,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch all reports error 500", function () {
		const action = {
			type: reportTypes.FETCH_ALL_FAILURE,
			payload: {
				error: 500,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch all reports error 504", function () {
		const action = {
			type: reportTypes.FETCH_ALL_FAILURE,
			payload: {
				error: 504,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reportsReducer(initialState, action)).toEqual(state)
	})
})
