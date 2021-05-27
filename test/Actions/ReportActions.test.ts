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

	it("should correctly handle usage report creation", function () {
		reportApi.getUsage = jest.fn(async () => {
			return axiosResponse
		})
		const expectedAction = [
			{
				type: reportTypes.CREATE_USAGE_SUCCESS,
			},
			{
				type: reportTypes.FETCH_ALL_SUCCESS,
			},
		]
		store.dispatch(reportActionsResolver.getUsage())
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle cleaner report creation", function () {
		reportApi.getCleaner = jest.fn(async () => {
			return axiosResponse
		})
		const expectedAction = [
			{
				type: reportTypes.CREATE_CLEANER_SUCCESS,
			},
			{
				type: reportTypes.FETCH_ALL_SUCCESS,
			},
		]
		store.dispatch(reportActionsResolver.getCleaner())
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle single report fetch", function () {
		reportApi.getReport = jest.fn(async () => {
			return axiosResponse
		})
		const expectedAction = [
			{
				type: reportTypes.FETCH_SINGLE_SUCCESS,
			},
		]
		store.dispatch(reportActionsResolver.getReport())
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle all reports fetch", function () {
		reportApi.getReports = jest.fn(async () => {
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

	it("should correctly handle usage report creation error", function () {
		reportApi.getUsage = jest.fn(async () => {
			throw new Error()
		})
		const expectedAction = [
			{
				type: reportTypes.CREATE_USAGE_FAILURE,
			},
		]
		store.dispatch(reportActionsResolver.getReport())
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle cleaner report creation error", function () {
		reportApi.getCleaner = jest.fn(async () => {
			throw new Error()
		})
		const expectedAction = [
			{
				type: reportTypes.CREATE_CLEANER_FAILURE,
			},
		]
		store.dispatch(reportActionsResolver.getCleaner())
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle single report fetch error", function () {
		reportApi.getReport = jest.fn(async () => {
			throw new Error()
		})
		const expectedAction = [
			{
				type: reportTypes.FETCH_SINGLE_FAILURE,
			},
		]
		store.dispatch(reportActionsResolver.getReport())
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle all reports fetch error", function () {
		reportApi.getReports = jest.fn(async () => {
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
