import roomReducer from "../../src/reducers/roomsReducer"
import {
	roomTypes,
	ERROR_UNKNOWN,
	ERROR_USERNAME_NOT_AVAILABLE,
	ERROR_BAD_DESK_POSITION,
	ERROR_DESK_ALREADY_EXISTS,
	ERROR_DESK_DOES_NOT_EXIST,
	ERROR_ROOM_DOES_NOT_EXIST,
} from "../../src/types"
import { JSDOM } from "jsdom"
import { stat } from "fs"

describe("accounts reducer test", function () {
	const initialState = {
		rooms: null,
		error: null,
	}

	const fakeRooms = {
		_embedded: {
			roomWithDesksList: [
				{
					name: "room1",
				},
				{
					name: "room2",
				},
			],
		},
	}

	it("should have correct initial state", function () {
		const action = {
			type: null,
		}
		expect(roomReducer(initialState, action)).toEqual(initialState)
	})

	it("should fetch correctly", function () {
		const action = {
			type: roomTypes.FETCH_SUCCESS,
			payload: fakeRooms,
		}

		const state = {
			rooms: fakeRooms._embedded.roomWithDesksList,
			error: "",
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should fetch correctly even with no rooms", function () {
		const action = {
			type: roomTypes.FETCH_SUCCESS,
			payload: {
				_embedded: {},
			},
		}

		const state = {
			rooms: undefined,
			error: "",
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should fetch correctly even with no payload", function () {
		const action = {
			type: roomTypes.FETCH_SUCCESS,
		}

		const state = {
			rooms: undefined,
			error: "",
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch error", function () {
		const otherPayload = {
			...fakeRooms._embedded.roomWithDesksList,
			error: 400,
		}

		const action = {
			type: roomTypes.FETCH_FAILURE,
			payload: otherPayload,
		}

		const state = {
			rooms: null,
			error: ERROR_UNKNOWN,
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle fetch error", function () {
		const action = {
			type: roomTypes.FETCH_FAILURE,
			payload: fakeRooms,
		}
		expect(roomReducer(initialState, action)).toEqual(initialState)
	})

	it("should correctly handle user fetch error with no proper message", function () {
		const action = {
			type: roomTypes.FETCH_SUCCESS,
			payload: fakeRooms,
		}

		const state = {
			error: "",
			rooms: fakeRooms._embedded.roomWithDesksList,
		}

		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle deletion error", function () {
		const otherPayload = {
			...fakeRooms,
			error: 409,
		}

		const action = {
			type: roomTypes.DELETE_FAILURE,
			payload: otherPayload,
		}

		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle unknown creation error", function () {
		const action = {
			type: roomTypes.DELETE_FAILURE,
			payload: fakeRooms,
		}

		const state = initialState
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should modify correctly", function () {
		const action = {
			type: roomTypes.MODIFY_SUCCESS,
			payload: fakeRooms,
		}

		const state = {
			...initialState,
			error: "",
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should delete correctly", function () {
		const action = {
			type: roomTypes.DELETE_SUCCESS,
			payload: fakeRooms,
		}

		const state = initialState
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should delete correctly even if errors", function () {
		const otherPayload = {
			...fakeRooms,
			error: 400,
		}

		const action = {
			type: roomTypes.DELETE_SUCCESS,
			payload: otherPayload,
		}

		const state = {
			...initialState,
			error: "",
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle deletion error", function () {
		const otherPayload = {
			...fakeRooms,
			error: 400,
		}

		const action = {
			type: roomTypes.DELETE_FAILURE,
			payload: otherPayload,
		}

		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle modify error 404", function () {
		const otherPayload = {
			...fakeRooms,
			error: 404,
		}

		const action = {
			type: roomTypes.MODIFY_FAILURE,
			payload: otherPayload,
		}

		const state = {
			...initialState,
			error: ERROR_ROOM_DOES_NOT_EXIST,
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle modify error even if no proper code", function () {
		const action = {
			type: roomTypes.MODIFY_FAILURE,
			payload: fakeRooms,
		}

		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}

		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle creation error", function () {
		const otherPayload = {
			...fakeRooms,
			error: 400,
		}

		const action = {
			type: roomTypes.CREATE_FAILURE,
			payload: otherPayload,
		}

		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle creation success", function () {
		const action = {
			type: roomTypes.CREATE_SUCCESS,
			payload: fakeRooms,
		}

		const state = {
			...initialState,
			error: "",
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle desk creation success", function () {
		const action = {
			type: roomTypes.CREATE_DESKS_SUCCESS,
			payload: fakeRooms,
		}

		const state = {
			...initialState,
			error: "",
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle desk modification success", function () {
		const action = {
			type: roomTypes.MODIFY_DESK_SUCCESS,
			payload: fakeRooms,
		}

		const state = {
			...initialState,
			error: "",
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle desk deletion with precedent error", function () {
		const action = {
			type: roomTypes.DELETE_DESK_SUCCESS,
			payload: {
				...fakeRooms,
				error: ERROR_UNKNOWN,
			},
		}

		const state = {
			...initialState,
			error: "",
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle desk deletion", function () {
		const action = {
			type: roomTypes.DELETE_DESK_SUCCESS,
			payload: fakeRooms,
		}

		expect(roomReducer(initialState, action)).toEqual(initialState)
	})

	it("should correctly handle desk deletion failure", function () {
		const action = {
			type: roomTypes.DELETE_DESK_FAILURE,
			payload: {
				...fakeRooms,
				error: 401,
			},
		}

		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}

		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle desk deletion failure 404", function () {
		const action = {
			type: roomTypes.DELETE_DESK_FAILURE,
			payload: {
				...fakeRooms,
				error: 404,
			},
		}

		const state = {
			...initialState,
			error: ERROR_DESK_DOES_NOT_EXIST,
		}

		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle desk deletion failure with no proper error", function () {
		const action = {
			type: roomTypes.DELETE_DESK_FAILURE,
			payload: fakeRooms,
		}

		expect(roomReducer(initialState, action)).toEqual(initialState)
	})

	it("should correctly handle desk creation failure error 400", function () {
		const action = {
			type: roomTypes.CREATE_DESKS_FAILURE,
			payload: {
				...fakeRooms,
				error: 400,
			},
		}

		const state = {
			...initialState,
			error: ERROR_BAD_DESK_POSITION,
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle desk creation failure error 409", function () {
		const action = {
			type: roomTypes.CREATE_DESKS_FAILURE,
			payload: {
				...fakeRooms,
				error: 409,
			},
		}

		const state = {
			...initialState,
			error: ERROR_DESK_ALREADY_EXISTS,
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle desk creation failure unexpected error", function () {
		const action = {
			type: roomTypes.CREATE_DESKS_FAILURE,
			payload: {
				...fakeRooms,
				error: 500,
			},
		}

		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}
		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle desk creation failure without proper error", function () {
		const action = {
			type: roomTypes.CREATE_DESKS_FAILURE,
			payload: fakeRooms,
		}

		expect(roomReducer(initialState, action)).toEqual(initialState)
	})

	it("should correctly handle desk modify failure", function () {
		const action = {
			type: roomTypes.MODIFY_DESK_FAILURE,
			payload: {
				...fakeRooms,
				error: 401,
			},
		}

		const state = {
			...initialState,
			error: ERROR_UNKNOWN,
		}

		expect(roomReducer(initialState, action)).toEqual(state)
	})

	it("should correctly handle desk modification failure woth no proper error", function () {
		const action = {
			type: roomTypes.MODIFY_DESK_FAILURE,
			payload: fakeRooms,
		}

		expect(roomReducer(initialState, action)).toEqual(initialState)
	})
})
