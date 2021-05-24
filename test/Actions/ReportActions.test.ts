import configureMockStore from "redux-mock-store"
import { reportTypes } from "../../src/types"
import fetchMock from "fetch-mock"
import thunk from "redux-thunk"
import { AxiosResponse } from "axios"
import { reportActions } from "../../src/actions/reportActions"

const mockStore = configureMockStore([thunk])

describe("Room actions", () => {
	afterEach(() => {
		fetchMock.restore()
	})

	let store
	let reportActionsResolver
	let reportApi

	beforeEach(() => {
		store = mockStore({
			login: {
				token: {
					id: "adminToken",
				},
			},
		})
		reportApi = jest.fn as jest.Mock<typeof reportApi>
		reportActionsResolver = new reportActions(reportApi)
	})

	const axiosResponse: AxiosResponse = {
		data: {},
		status: 200,
		statusText: "OK",
		config: {},
		headers: {},
	}

	it("should correctly handle all reports fetch", function () {
		reportApi.getReport = jest.fn(async () => {
			return axiosResponse
		})
		const expectedAction = [
			{
				type: reportTypes.FETCH_ALL_SUCCESS,
			},
		]
		store.dispatch(reportActionsResolver.getReports())
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle all reports fetch error", function () {
		reportApi.getReport = jest.fn(async () => {
			throw new Error()
		})
		const expectedAction = [
			{
				type: reportTypes.FETCH_ALL_FAILURE,
			},
		]
		store.dispatch(reportActionsResolver.getReports())
		// expect(store.getActions()).toContain(expectedAction)
	})
})
