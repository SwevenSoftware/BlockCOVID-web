import axios, { AxiosResponse, AxiosStatic } from "axios"

export interface ReportInformation {
	name: string,
	creationDate: Date,
	registrationDate: Date
}

export class reportAPI {
	private axios: AxiosStatic

	constructor(axios: AxiosStatic) {
		this.axios = axios
	}

	getUsage(
		tokenID: string,
		data: { fromTimestamp: string; toTimestamp: string }
	): Promise<AxiosResponse> {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: tokenID,
			},
			params: {
				from: data.fromTimestamp,
				to: data.toTimestamp,
			},
		}
		return this.axios.get("/api/reports/usage", config)
	}

	getReport(
		tokenID: string,
		data: { reportName: string }
	): Promise<AxiosResponse> {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: tokenID,
			},
			params: {
				reportName: data.reportName,
			},
		}
		return this.axios.get("/api/reports/report/" + data.reportName, config)
	}

	getCleaner(tokenID: string): Promise<AxiosResponse> {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: tokenID,
			},
		}
		return this.axios.get("/api/reports/cleaner", config)
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
