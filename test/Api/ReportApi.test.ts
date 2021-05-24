import axios, { AxiosResponse } from "axios"
import reportAPI from "../../src/Api/reportAPI"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("reportApi", () => {
	it("correctly gets all reports", () => {
		const axiosResponse: AxiosResponse = {
			data: [
				{
					name: "Registered_Report_usage_20210523_000000.pdf",
					creationDate: "2021-05-23T00:00:00.028264417",
					registrationDate: "2021-05-23T00:00:00.028264417",
				},
			],
			status: 200,
			statusText: "OK",
			config: {},
			headers: {},
		}

		const config = {
			headers: {
				Authorization: "adminToken",
				"Content-Type": "application/json",
			},
		}

		mockedAxios.get.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(reportAPI.getReports("adminToken")).resolves.toEqual(
			axiosResponse
		)
		expect(mockedAxios.get).lastCalledWith("/api/reports/all", config)
	})
})
