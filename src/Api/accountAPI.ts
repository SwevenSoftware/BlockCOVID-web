import axios, { AxiosResponse, AxiosStatic } from "axios"

export class accountAPI {
	private axios: AxiosStatic

	constructor(axios: AxiosStatic) {
		this.axios = axios
	}

	login(data: {
		username: string
		password: string
	}): Promise<AxiosResponse> {
		const config = {
			headers: { "Content-Type": "application/json" },
		}
		return this.axios.post("/api/account/login", data, config)
	}

	logout(tokenID: string): Promise<AxiosResponse> {
		const config = {
			headers: {
				Authorization: tokenID,
				"Content-Type": "application/json",
			},
		}
		return this.axios.delete("/api/account/logout", config)
	}

	createAccount(
		tokenID: string,
		data: { username: string; password: string; authorities: string[] }
	): Promise<AxiosResponse> {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: tokenID,
			},
		}
		return this.axios.post("/api/users", data, config)
	}

	modifyAccount(
		tokenID: string,
		url: string,
		data: {
			username: string
			password: string | null
			authorities: string[]
		}
	): Promise<AxiosResponse> {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: tokenID,
			},
		}
		if (!data.password) {
			const dataNoPassword = {
				username: data.username,
				authorities: data.authorities,
			}
			return this.axios.put(url, dataNoPassword, config)
		}
		return this.axios.put(url, data, config)
	}

	deleteAccount(
		tokenID: string,
		url: string,
		data: { username: string }
	): Promise<AxiosResponse> {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: tokenID,
			},
		}
		return this.axios.delete(url + data.username, config)
	}

	getAccounts(tokenID: string): Promise<AxiosResponse> {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: tokenID,
			},
		}
		return this.axios.get("/api/users", config)
	}
}

export default new accountAPI(axios)
