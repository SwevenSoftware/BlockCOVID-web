import reservationsReducer, {
	initialState,
} from "../../src/reducers/reservationsReducer"
import { ERROR_UNKNOWN, reservationTypes } from "../../src/types"

describe("reservations reducer test", function () {
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

	it("should have correct initial state", function () {
		const action = {
			type: null,
		}
		expect(reservationsReducer(initialState, action)).toEqual(initialState)
	})

	it("should correctly fetch weekly reservations", function () {
		const action = {
			type: reservationTypes.FETCH_RESERVATIONS_BY_USER_SUCCESS,
			payload: {
				...fakeReservations,
				username:
					fakeReservations._embedded.reservationWithRoomList.find(
						(reservation) => reservation.id === "prenotazioneID1"
					)!.username,
			},
		}
		const state = {
			...initialState,
			reservations: {
				[fakeReservations._embedded.reservationWithRoomList.find(
					(reservation) => reservation.id === "prenotazioneID1"
				)!.username]: [
					{
						title: fakeReservations._embedded.reservationWithRoomList.find(
							(reservation) =>
								reservation.id === "prenotazioneID1"
						)!.room,
						startDate: new Date(
							fakeReservations._embedded.reservationWithRoomList.find(
								(reservation) =>
									reservation.id === "prenotazioneID1"
							)!.start + "Z"
						),
						endDate: new Date(
							fakeReservations._embedded.reservationWithRoomList.find(
								(reservation) =>
									reservation.id === "prenotazioneID1"
							)!.end + "Z"
						),
						id: 0,
						location:
							fakeReservations._embedded.reservationWithRoomList.find(
								(reservation) =>
									reservation.id === "prenotazioneID1"
							)!.room,
					},
				],
			},
		}
		expect(reservationsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly fetch weekly reservations even with no payload", function () {
		const action = {
			type: reservationTypes.FETCH_RESERVATIONS_BY_USER_SUCCESS,
		}
		expect(reservationsReducer(initialState, action)).toEqual(initialState)
	})

	it("should correctly fetch weekly reservations with payload missing data and delete what is inside of state", function () {
		const action = {
			type: reservationTypes.FETCH_RESERVATIONS_BY_USER_SUCCESS,
			payload: {
				username:
					fakeReservations._embedded.reservationWithRoomList.find(
						(reservation) => reservation.id === "prenotazioneID1"
					)!.username,
			},
		}
		const startState = {
			...initialState,
			reservations: {
				[fakeReservations._embedded.reservationWithRoomList.find(
					(reservation) => reservation.id === "prenotazioneID1"
				)!.username]: [
					{
						title: fakeReservations._embedded.reservationWithRoomList.find(
							(reservation) =>
								reservation.id === "prenotazioneID1"
						)!.room,
						startDate: new Date(
							fakeReservations._embedded.reservationWithRoomList.find(
								(reservation) =>
									reservation.id === "prenotazioneID1"
							)!.start + "Z"
						),
						endDate: new Date(
							fakeReservations._embedded.reservationWithRoomList.find(
								(reservation) =>
									reservation.id === "prenotazioneID1"
							)!.end + "Z"
						),
						id: 0,
						location:
							fakeReservations._embedded.reservationWithRoomList.find(
								(reservation) =>
									reservation.id === "prenotazioneID1"
							)!.room,
					},
				],
			},
		}
		expect(reservationsReducer(startState, action)).toEqual(initialState)
	})

	it("should correctly handle fetch weekly reservations error 400", function () {
		const action = {
			type: reservationTypes.FETCH_RESERVATIONS_BY_USER_FAILURE,
			payload: {
				error: 400,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reservationsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch weekly reservations error 404", function () {
		const action = {
			type: reservationTypes.FETCH_RESERVATIONS_BY_USER_FAILURE,
			payload: {
				error: 404,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reservationsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch weekly reservations error 500", function () {
		const action = {
			type: reservationTypes.FETCH_RESERVATIONS_BY_USER_FAILURE,
			payload: {
				error: 500,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reservationsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch weekly reservations error 504", function () {
		const action = {
			type: reservationTypes.FETCH_RESERVATIONS_BY_USER_FAILURE,
			payload: {
				error: 504,
			},
		}
		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(reservationsReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle loading state when fetching reservations", function () {
		const action = {
			type: reservationTypes.FETCH_RESERVATIONS_BY_USER_LOADING,
		}
		const state = {
			...initialState,
			loading: true,
		}
		expect(reservationsReducer(initialState, action)).toEqual(state)
	})
})
