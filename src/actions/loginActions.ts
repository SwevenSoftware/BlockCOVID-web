import accountApi, { accountAPI } from "../Api/accountAPI";
import { loginTypes } from "../types";

export class accountActions {
    accountApi: accountAPI;

    constructor(accountApi: accountAPI) {
        this.accountApi = accountApi;
    }

    login(username: string, password: string) {
        return (dispatch, getState) => {
            this.accountApi.login(username, password)
                .then(res => {
                    dispatch(this.successLogin(res.data))
                })
                .catch(err => {
                    dispatch(this.failureLogin(err.response.status))
                })
        }
    }
    logout(tokenID: string) {
        return (dispatch, getState) => {
            this.accountApi.logout(getState().login.token?.id)
                .then(res => {
                    dispatch(this.successLogout(res.data))
                })
                .catch(err => {
                    dispatch(this.failureLogout(err.response.status))
                })
        }
    }

    successLogin = (data) => ({
        type: loginTypes.LOGIN_SUCCESS,
        payload: {
            ...data
        }
    })

    successLogout = (data) => ({
        type: loginTypes.LOGOUT_SUCCESS,
        payload: {
            ...data
        }
    })

    failureLogin = (error) => ({
        type: loginTypes.LOGIN_FAILURE,
        payload: {
            error
        }
    })

    failureLogout = (error) => ({
        type: loginTypes.LOGOUT_FAILURE,
        payload: {
            error
        }
    })
}

export default new accountActions(accountApi);