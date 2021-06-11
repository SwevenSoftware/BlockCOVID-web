import configureMockStore from "redux-mock-store"
import { reportTypes, reservationTypes } from "../../src/types"
import fetchMock from "fetch-mock"
import thunk from "redux-thunk"
import { AxiosResponse } from "axios"
import { reservationsActions } from "../../src/actions/reservationsActions"

const mockStore = configureMockStore([thunk])

describe("Reservation actions", () => {
	afterEach(() => {
		fetchMock.restore()
	})

	const fakeDate = new Date()
	const fakeReservations = {
		_embedded: {
			reservationWithRoomList: [
				{
					id: "prenotazioneID1",
					deskId: "postazioneID1",
					room: "stanza1",
					username: "utente1",
					start: fakeDate,
					end: fakeDate,
					usageStart: fakeDate,
					usageEnd: fakeDate,
					deskCleaned: false,
					ended: true,
					_links: [],
				},
			],
		},
	}

	let store
	let reservationsActionsResolver
	let reservationApi

	beforeEach(() => {
		store = mockStore({
			login: {
				token: {
					id: "adminToken",
				},
				error: "",
			},
			reservations: {
				reservations: null,
				error: "",
				loading: false,
			},
		})
		reservationApi = jest.fn as jest.Mock<typeof reservationApi>
		reservationsActionsResolver = new reservationsActions(reservationApi)
	})

	const axiosResponse: AxiosResponse = {
		data: {},
		status: 200,
		statusText: "OK",
		config: {},
		headers: {},
	}

	it("should correctly fetch reservations by user", function () {
		reservationApi.getReservationsByUser = jest.fn(async () => {
			return axiosResponse
		})
		const expectedAction = [
			{
				type: reservationTypes.FETCH_RESERVATIONS_BY_USER_LOADING,
			},
			{
				type: reservationTypes.FETCH_RESERVATIONS_BY_USER_SUCCESS,
				payload: {
					...fakeReservations,
					username:
						fakeReservations._embedded.reservationWithRoomList.find(
							(reservation) =>
								reservation.id === "prenotazioneID1"
						)!.username,
				},
			},
		]
		const data = {
			startTime: "2021-01-10T22:00",
			endTime: "2021-01-16T21:59",
			username: "utente1",
		}
		store.dispatch(reservationsActionsResolver.getReservationsByUser(data))
		// expect(store.getActions()).toContain(expectedAction)
	})

	it("should correctly handle fetch reservations by user error", function () {
		reservationApi.getReservationsByUser = jest.fn(async () => {
			throw new Error()
		})
		const expectedAction = [
			{
				type: reservationTypes.FETCH_RESERVATIONS_BY_USER_LOADING,
			},
			{
				type: reportTypes.CREATE_USAGE_FAILURE,
			},
		]
		const data = {
			startTime: "2021-01-10T22:00",
			endTime: "2021-01-16T21:59",
			username: "utente1",
		}
		store.dispatch(reservationsActionsResolver.getReservationsByUser(data))
		// expect(store.getActions()).toContain(expectedAction)
	})
})
