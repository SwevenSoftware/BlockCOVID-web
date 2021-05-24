import reportsReducer, { initialState } from "../../src/reducers/reportReducer"
import { reportTypes } from "../../src/types"

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
					creationDate: "2021-05-23T00:00:00.028264417",
					registrationDate: "2021-05-23T00:00:00.028264417",
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
})
