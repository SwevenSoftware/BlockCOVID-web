import { accountTypes } from "../types"
import accountApi, { accountAPI } from '../Api/accountAPI'

export interface accountInformation {
    username: string,
    password: string,
    authorities: string[]
}

class accountsActions {
    accountApi: accountAPI

    constructor(accountApi: accountAPI) {
        this.accountApi = accountApi
    }

    createAccount(data: accountInformation) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            this.accountApi.createAccount(tokenID, data)
                .then((res) => {
                    dispatch(this.successCreateAccount(res.data))
                    dispatch(this.getAccounts())
                })
                .catch(err => {
                    dispatch(this.failureCreateAccount(err.response.status))
                })
        }
    }

    modifyAccount(url: string, data: accountInformation) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            this.accountApi.modifyAccount(tokenID, url, data)
                .then((res) => {
                    dispatch(this.successModifyAccount(res.data))
                    dispatch(this.getAccounts())
                })
                .catch(err => {
                    dispatch(this.failureModifyAccount(err.response.status))
                })
        }
    }

    deleteAccount(url: string, data: { username: string }) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            this.accountApi.deleteAccount(tokenID, url, data)
                .then((res) => {
                    dispatch(this.successDeleteAccount(res.data))
                    dispatch(this.getAccounts())
                })
                .catch(err => {
                    dispatch(this.failureDeleteAccount(err.response.status))
                })
        }
    }

    getAccounts() {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            this.accountApi.getAccounts(tokenID)
              .then(res => {
                  dispatch(this.successGetAccounts(res.data))
              })
              .catch(err => {
                  dispatch(this.failureGetAccounts(err.response.status))
              })
        }
    }

    successCreateAccount = (data) => ({
        type: accountTypes.CREATE_SUCCESS,
        payload: {
            ...data
        }
    })

    successModifyAccount = (data) => ({
        type: accountTypes.MODIFY_SUCCESS,
        payload: {
            ...data
        }
    })

    successDeleteAccount = (data) => ({
        type: accountTypes.DELETE_SUCCESS,
        payload: {
            ...data
        }
    })

    successGetAccounts = (data) => ({
        type: accountTypes.FETCH_SUCCESS,
        payload: {
            ...data
        }
    })

    failureCreateAccount = (error) => ({
        type: accountTypes.CREATE_FAILURE,
        payload: {
            error
        }
    })

    failureModifyAccount = (error) => ({
        type: accountTypes.MODIFY_FAILURE,
        payload: {
            error
        }
    })

    failureDeleteAccount = (error) => ({
        type: accountTypes.DELETE_FAILURE,
        payload: {
            error
        }
    })

    failureGetAccounts = (error) => ({
        type: accountTypes.FETCH_FAILURE,
        payload: {
            error
        }
    })
}

export default new accountsActions(accountApi)