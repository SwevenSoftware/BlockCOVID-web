import { reservationTypes, ERROR_UNKNOWN } from "../../types"

export const reservationsHandlers = {}

reservationsHandlers[reservationTypes.FETCH_RESERVATIONS_BY_USER_SUCCESS] =
	function (state, action) {
		if (action.payload?._embedded) {
			let appointments: {
				title: string
				startDate: Date
				endDate: Date
				id: number
				location: string
			}[] = []

			action.payload._embedded.reservationWithRoomList.map(
				(reservation: {
					id: string
					deskId: string
					room: string
					username: string
					start: Date
					end: Date
					usageStart: Date | null
					usageEnd: Date | null
					deskCleaned: boolean
					ended: boolean
					_links: any
				}) => {
					appointments.push({
						title: reservation.room,
						startDate: new Date(reservation.start + "Z"),
						endDate: new Date(reservation.end + "Z"),
						id: appointments.length,
						location: reservation.room,
					})
				}
			)

			return {
				reservations: {
					...state.reservations,
					[action.payload.username]: appointments,
				},
				error: "",
			}
		} else {
			if (state.reservations) {
				if (state.reservations[action.payload.username]) {
					delete state.reservations[action.payload.username]
					if (Object.keys(state.reservations).length === 0) {
						return {
							reservations: null,
							error: "",
						}
					}
				}
			}

			return {
				...state,
				error: "",
			}
		}
	}

reservationsHandlers[reservationTypes.FETCH_RESERVATIONS_BY_USER_FAILURE] =
	function (state, action) {
		switch (action.payload) {
			default:
				return {
					reservations: null,
					error: ERROR_UNKNOWN,
				}
		}
	}
