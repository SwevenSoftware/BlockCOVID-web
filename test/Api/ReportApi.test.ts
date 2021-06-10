import axios, { AxiosResponse } from "axios"
import reportAPI from "../../src/Api/reportAPI"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("reportApi", () => {
	const axiosResponse: AxiosResponse = {
		data: {},
		status: 200,
		statusText: "OK",
		config: {},
		headers: {},
	}
	const adminToken = "adminToken"
	const requestConfig = {
		headers: {
			"Content-Type": "application/json",
			Authorization: adminToken,
		},
	}

	afterEach(() => {
		jest.clearAllMocks()
	})

	it("correctly gets report listing reservations' usage status", () => {
		const data = {
			fromTimestamp: "2021-01-01T08:00",
			toTimestamp: "2021-01-01T20:00",
		}
		const config = {
			...requestConfig,
			headers: {
				...requestConfig.headers,
				"Content-Type": "application/pdf",
			},
			responseType: "blob",
			params: {
				from: data.fromTimestamp,
				to: data.toTimestamp,
			},
		}
		mockedAxios.get.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(reportAPI.getUsage(adminToken, data)).resolves.toEqual(
			axiosResponse
		)
		expect(mockedAxios.get).lastCalledWith("/api/reports/usage", config)
	})

	it("correctly gets a report by its name", () => {
		const data = {
			reportName: "Registered_Report_usage_20210523_000000.pdf",
		}
		const config = {
			...requestConfig,
			headers: {
				...requestConfig.headers,
				"Content-Type": "application/pdf",
			},
			responseType: "blob",
		}
		mockedAxios.get.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(reportAPI.getReport(adminToken, data)).resolves.toEqual(
			axiosResponse
		)
		expect(mockedAxios.get).lastCalledWith(
			"/api/reports/report/" + data.reportName,
			config
		)
	})

	it("correctly gets report listing rooms' cleaning status", () => {
		const config = {
			...requestConfig,
			headers: {
				...requestConfig.headers,
				"Content-Type": "application/pdf",
			},
			responseType: "blob",
		}
		mockedAxios.get.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(reportAPI.getCleaner(adminToken)).resolves.toEqual(axiosResponse)
		expect(mockedAxios.get).lastCalledWith("/api/reports/cleaner", config)
	})

	it("correctly gets all reports", () => {
		mockedAxios.get.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(reportAPI.getReports(adminToken)).resolves.toEqual(axiosResponse)
		expect(mockedAxios.get).lastCalledWith(
			"/api/reports/all",
			requestConfig
		)
	})
})
