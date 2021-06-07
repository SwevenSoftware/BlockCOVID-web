import axios, { AxiosResponse, AxiosStatic } from "axios"

export class reservationAPI {
	private axios: AxiosStatic

	constructor(axios: AxiosStatic) {
		this.axios = axios
	}

	getReservationsByUser(
		tokenID: string,
		data: {
			startTime: string
			endTime: string
			username: string
		}
	) {
		const config = {
			headers: {
				Authorization: tokenID,
				"Content-Type": "application/json",
			},
			params: {
				from: data.startTime, // far date, just for debugging: "2021-01-13T22:00"
				to: data.endTime,
			},
		}
		return this.axios.get(
			"/api/reservations/view/user/" + data.username,
			config
		)
	}
}

export default new reservationAPI(axios)
