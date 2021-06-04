import {
	reservationTypes,
	ERROR_UNKNOWN,
} from "../../types"

export const reservationsHandlers = {}

reservationsHandlers[reservationTypes.FETCH_RESERVATIONS_BY_USER_SUCCESS] = function (state, action) {
	return {
		reservations:{
			...state.reservations,
			[action.payload.username]: action.payload._embedded.reservationWithRoomList
		},
		error: ""
	}
}

reservationsHandlers[reservationTypes.FETCH_RESERVATIONS_BY_USER_FAILURE] = function (state, action) {
	switch (action.payload.error) {
		default:
			return {
				reservations: null,
				error: ERROR_UNKNOWN,
			}
	}
}