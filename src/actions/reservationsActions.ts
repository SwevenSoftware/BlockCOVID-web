import { reservationTypes } from "../types"
import reservationApi, { reservationAPI } from "../Api/reservationAPI"

export class reservationsActions {
	reservationApi: reservationAPI

	constructor(reservationApi: reservationAPI) {
		this.reservationApi = reservationApi
	}

	getReservationsByUser(data: {
		username: string
		startTime: string
		endTime: string
	}) {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			dispatch(this.loadingGetReservationsByUser())
			this.reservationApi
				.getReservationsByUser(tokenID, data)
				.then((res) => {
					dispatch(
						this.successGetReservationsByUser(
							res.data,
							data.username
						)
					)
				})
				.catch((err) => {
					dispatch(
						this.failureGetReservationsByUser(err?.response?.status)
					)
				})
		}
	}

	successGetReservationsByUser = (data, username) => ({
		type: reservationTypes.FETCH_RESERVATIONS_BY_USER_SUCCESS,
		payload: {
			...data,
			username: username,
		},
	})

	failureGetReservationsByUser = (error) => ({
		type: reservationTypes.FETCH_RESERVATIONS_BY_USER_FAILURE,
		payload: {
			error,
		},
	})

	loadingGetReservationsByUser = () => ({
		type: reservationTypes.FETCH_RESERVATIONS_BY_USER_LOADING,
	})
}

export default new reservationsActions(reservationApi)
