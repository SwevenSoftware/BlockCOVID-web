import axios, { AxiosResponse, AxiosStatic } from "axios"

export class reportAPI {
	private axios: AxiosStatic

	constructor(axios: AxiosStatic) {
		this.axios = axios
	}

	getReports(tokenID: string): Promise<AxiosResponse> {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: tokenID,
			},
		}
		return this.axios.get("/api/reports/all", config)
	}
}

export default new reportAPI(axios)
