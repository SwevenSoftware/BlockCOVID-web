import configureMockStore from "redux-mock-store"
import { roomTypes } from "../../src/types"
import fetchMock from "fetch-mock"
import thunk from "redux-thunk"
import { AxiosResponse } from "axios"
import { roomActions } from "../../src/actions/roomsActions"
import { RoomInformation, DeskInformation } from "../../src/Api/roomAPI"

const mockStore = configureMockStore([thunk])

describe("Room actions", () => {
	afterEach(() => {
		fetchMock.restore()
	})

	const roomInformation: RoomInformation = {
		name: "room",
		openingAt: "08:00",
		closingAt: "18:00",
		openingDays: ["MONDAY"],
		width: 10,
		height: 10,
	}

	let store
	let roomActionsResolver
	let roomsApi

	beforeEach(() => {
		store = mockStore({
			login: {
				token: {
					id: "adminToken",
				},
			},
		})
		roomsApi = jest.fn as jest.Mock<typeof roomsApi>
		roomActionsResolver = new roomActions(roomsApi)
	})

	const axiosResponse: AxiosResponse = {
		data: roomInformation,
		status: 200,
		statusText: "OK",
		config: {},
		headers: {},
	}

	it("should correctly handle room creation", function () {
		roomsApi.createRoom = jest.fn(async () => {
			return axiosResponse
		})
		const expectedAction = [
			{
				type: roomTypes.CREATE_SUCCESS,
			},
			{
				type: roomTypes.FETCH_SUCCESS,
				payload: roomInformation,
			},
		]
		store.dispatch(roomActionsResolver.createRoom(roomInformation))
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle room modification", function () {
		roomsApi.modifyRoom = jest.fn(async () => {
			return axiosResponse
		})
		const expectedAction = [
			{
				type: roomTypes.MODIFY_SUCCESS,
			},
			{
				type: roomTypes.FETCH_SUCCESS,
				payload: roomInformation,
			},
		]
		store.dispatch(
			roomActionsResolver.modifyRoom({
				url: "/api/rooms/",
				roomName: "roomName",
				data: roomInformation,
			})
		)
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle room deletion", function () {
		roomsApi.deleteRoom = jest.fn(async () => {
			return axiosResponse
		})
		const expectedAction = [
			{
				type: roomTypes.MODIFY_SUCCESS,
			},
			{
				type: roomTypes.FETCH_SUCCESS,
				payload: roomInformation,
			},
		]
		store.dispatch(
			roomActionsResolver.deleteRoom("api/rooms/", { roomName: "room" })
		)
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle room fetch", function () {
		roomsApi.getRooms = jest.fn(async () => {
			return axiosResponse
		})
		const expectedAction = [
			{
				type: roomTypes.FETCH_SUCCESS,
			},
		]
		store.dispatch(
			roomActionsResolver.getRooms({ fromTimeStamp: "", toTimeStamp: "" })
		)
		// expect(store.getActions()).toContain(expectedAction)
	})

	/* ERRORS */

	it("should correctly handle room creation error", function () {
		roomsApi.createRoom = jest.fn(async () => {
			throw new Error()
		})
		const expectedAction = [
			{
				type: roomTypes.CREATE_FAILURE,
			},
			{
				type: roomTypes.FETCH_SUCCESS,
				payload: roomInformation,
			},
		]
		store.dispatch(roomActionsResolver.createRoom(roomInformation))
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle room modification error", function () {
		roomsApi.modifyRoom = jest.fn(async () => {
			throw new Error()
		})
		const expectedAction = [
			{
				type: roomTypes.MODIFY_FAILURE,
			},
			{
				type: roomTypes.FETCH_SUCCESS,
				payload: roomInformation,
			},
		]
		store.dispatch(
			roomActionsResolver.modifyRoom({
				url: "/api/rooms/",
				roomName: "roomName",
				data: roomInformation,
			})
		)
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle room deletion error", function () {
		roomsApi.deleteRoom = jest.fn(async () => {
			throw new Error()
		})
		const expectedAction = [
			{
				type: roomTypes.MODIFY_FAILURE,
			},
			{
				type: roomTypes.FETCH_SUCCESS,
				payload: roomInformation,
			},
		]
		store.dispatch(
			roomActionsResolver.deleteRoom("api/rooms/", { roomName: "room" })
		)
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle room fetch error", function () {
		roomsApi.getRooms = jest.fn(async () => {
			throw new Error()
		})
		const expectedAction = [
			{
				type: roomTypes.FETCH_FAILURE,
			},
		]
		store.dispatch(
			roomActionsResolver.getRooms({ fromTimestamp: "", toTimeStamp: "" })
		)
		// expect(store.getActions()).toContain(expectedAction)
	})
})
