import accountApi, { accountAPI } from "../Api/accountAPI"
import { loginTypes } from "../types"

export class loginActions {
	accountApi: accountAPI

	constructor(accountApi: accountAPI) {
		this.accountApi = accountApi
	}

	login(data: { username: string; password: string }) {
		return (dispatch) => {
			this.accountApi
				.login(data)
				.then((res) => {
					dispatch(this.successLogin(res.data))
				})
				.catch((err) => {
					dispatch(this.failureLogin(err.response.status))
				})
		}
	}

	logout() {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			this.accountApi
				.logout(tokenID)
				.finally(dispatch(this.successLogout()))
		}
	}

	successLogin = (data) => ({
		type: loginTypes.LOGIN_SUCCESS,
		payload: {
			...data,
		},
	})

	successLogout = () => ({
		type: loginTypes.LOGOUT,
	})

	failureLogin = (error) => ({
		type: loginTypes.LOGIN_FAILURE,
		payload: {
			error,
		},
	})
}

export default new loginActions(accountApi)
