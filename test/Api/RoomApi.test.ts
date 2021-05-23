import axios, { AxiosResponse } from "axios"
import roomApi from "../../src/Api/roomAPI"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("roomApi", () => {
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

	it("correct create room", () => {
		const data = {
			name: "",
			openingAt: "",
			closingAt: "",
			openingDays: [],
			width: 1,
			height: 1,
		}
		mockedAxios.post.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(roomApi.createRoom(adminToken, data)).resolves.toEqual(
			axiosResponse
		)
		expect(mockedAxios.post).lastCalledWith(
			"/api/rooms",
			data,
			requestConfig
		)
	})

	it("correct modify room", () => {
		const data = {
			roomName: "",
			name: "",
			openingAt: "",
			closingAt: "",
			openingDays: [],
			width: 1,
			height: 1,
		}

		mockedAxios.put.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(roomApi.modifyRoom(adminToken, data)).resolves.toEqual(
			axiosResponse
		)
		expect(mockedAxios.put).lastCalledWith(
			"/api/rooms/" + data.roomName,
			data,
			requestConfig
		)
	})

	it("correct delete room", () => {
		const data = {
			roomName: "room",
		}
		mockedAxios.delete.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(
			roomApi.deleteRoom("adminToken", "/api/rooms/", data)
		).resolves.toEqual(axiosResponse)
		expect(mockedAxios.delete).lastCalledWith(
			"/api/rooms/" + data.roomName,
			requestConfig
		)
	})

	it("correct getRooms", () => {
		mockedAxios.get.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(
			roomApi.getRooms(adminToken, { fromTimestamp: "", toTimestamp: "" })
		).resolves.toEqual(axiosResponse)
		expect(mockedAxios.get).lastCalledWith("/api/rooms", {
			...requestConfig,
			params: {
				from: "",
				to: "",
			},
		})
	})

	it("creates correctly a list of desks in the room", () => {
		const data = {
			roomName: "room",
			desks: [
				{
					x: 1,
					y: 1,
				},
			],
		}
		mockedAxios.post.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(roomApi.createDesks(adminToken, data)).resolves.toEqual(
			axiosResponse
		)
		expect(mockedAxios.post).lastCalledWith(
			"/api/rooms/" + data.roomName + "/desks",
			data.desks,
			requestConfig
		)
	})

	it("modifies correctly a desk in the room", () => {
		const data = {
			roomName: "room",
			desk: {
				oldInfo: {
					id: "",
					x: 1,
					y: 1,
				},
				newInfo: {
					id: "",
					x: 2,
					y: 2,
				},
			},
		}
		mockedAxios.put.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(roomApi.modifyDesk(adminToken, data)).resolves.toEqual(
			axiosResponse
		)
		expect(mockedAxios.put).lastCalledWith(
			"/api/rooms/" + data.roomName + "/desks",
			data.desk,
			requestConfig
		)
	})

	it("deletes correctly a desk in the room", () => {
		const data = {
			roomName: "room",
			desksId: ["id1", "id2"],
		}
		const config = {
			...requestConfig,
			data: data.desksId,
		}
		mockedAxios.delete.mockImplementationOnce(() =>
			Promise.resolve(axiosResponse)
		)
		expect(roomApi.deleteDesk(adminToken, data)).resolves.toEqual(
			axiosResponse
		)
		expect(mockedAxios.delete).lastCalledWith("/api/rooms/desks", config)
	})
})
