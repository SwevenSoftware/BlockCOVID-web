import { reservationTypes, ERROR_UNKNOWN } from "../../types"

export const reservationsHandlers = {}

reservationsHandlers[reservationTypes.FETCH_RESERVATIONS_BY_USER_SUCCESS] =
	function (state, action) {
		if (action.payload?._embedded) {
			return {
				reservations: {
					...state.reservations,
					[action.payload.username]:
						action.payload._embedded.reservationWithRoomList,
				},
				error: "",
			}
		} else {
			return {
				reservations: null,
				error: "",
			}
		}
	}

reservationsHandlers[reservationTypes.FETCH_RESERVATIONS_BY_USER_FAILURE] =
	function (state, action) {
		console.log(action.payload)
		switch (action.payload) {
			default:
				return {
					reservations: null,
					error: ERROR_UNKNOWN,
				}
		}
	}
