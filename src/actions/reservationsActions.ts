import { reservationTypes } from "../types"
import reservationApi, { reservationAPI } from "../Api/reservationAPI"

export class reservationsActions {
	reservationApi: reservationAPI

	constructor(reservationApi: reservationAPI) {
		this.reservationApi = reservationApi
	}

   getReservationsByUser(data: {username: string, startTime: string, endTime: string}) {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			this.reservationApi
				.getReservationsByUser(tokenID, data)
				.then((res) => {
					dispatch(this.successGetReservationsByUser(res.data))
				})
				.catch((err) => {
					dispatch(this.failureGetReservationsByUser(err?.response?.status))
				})
		}
	}

   successGetReservationsByUser = (data) => ({
		type: reservationTypes.FETCH_RESERVATIONS_BY_USER_SUCCESS,
		payload: {
			...data,
		},
	})

   failureGetReservationsByUser = (error) => ({
		type: reservationTypes.FETCH_RESERVATIONS_BY_USER_FAILURE,
		payload: {
			error,
		},
	})
}

export default new reservationsActions(reservationApi)