import axios, { AxiosResponse, AxiosStatic } from "axios"

export interface ReportInformation {
	name: string
	creationDate: Date
	registrationDate: Date
	hash: string
	transactionHash: string
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
		return this.axios.get("/api/reports/usage", {
			headers: {
				"Content-Type": "application/pdf",
				Authorization: tokenID,
			},
			responseType: "blob",
			params: {
				from: data.fromTimestamp,
				to: data.toTimestamp,
			},
		})
	}

	getCleaner(tokenID: string): Promise<AxiosResponse> {
		return this.axios.get("/api/reports/cleaner", {
			headers: {
				"Content-Type": "application/pdf",
				Authorization: tokenID,
			},
			responseType: "blob",
		})
	}

	getReport(
		tokenID: string,
		data: { reportName: string }
	): Promise<AxiosResponse> {
		return this.axios.get("/api/reports/report/" + data.reportName, {
			headers: {
				"Content-Type": "application/pdf",
				Authorization: tokenID,
			},
			responseType: "blob",
		})
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
