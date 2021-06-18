import axios, { AxiosResponse } from "axios"
import reservatonAPI from "../../src/Api/reservationAPI"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("reservationApi", () => {
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

	it("should correctly fetch weekly reservations", () => {
		const data = {
			startTime: "2021-01-10T22:00",
			endTime: "2021-01-16T21:59",
			username: "utente1",
		}
		const config = {
			...requestConfig,
			params: {
				from: data.startTime,
				to: data.endTime,
			},
		}
		mockedAxios.get.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(
			reservatonAPI.getReservationsByUser(adminToken, data)
		).resolves.toEqual(axiosResponse)
		expect(mockedAxios.get).lastCalledWith(
			"/api/reservations/view/user/" + data.username,
			config
		)
	})
})
