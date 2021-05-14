import { accountTypes } from "../types";
import accountApi, { accountAPI } from '../Api/accountAPI';

class accountsActions {

    accountApi: accountAPI;

    constructor(accountApi: accountAPI) {
        this.accountApi = accountApi;
    }

    getAccounts (tokenID: string) {
        return (dispatch, getState) => {
            this.accountApi.getAccounts(tokenID)
                .then(res => {
                    dispatch(this.successGetAccounts(res.data))
                })
                .catch(err => {
                    dispatch(this.failureGetAccounts(err.response.status))
                })
        }
    }

    createAccount ({ tokenID, username, password, auth }) {
        return (dispatch, getState) => {
            this.accountApi.createAccount(tokenID, username, password, auth)
                .then((res) => {
                    dispatch(this.successCreateAccount(res.data))
                    dispatch(this.getAccounts(tokenID))
                })
                .catch(err => {
                    dispatch(this.failureCreateAccount(err))
                })
        }
    }

    modifyAccount ({ tokenID, link, username, password, auth }) {
        return (dispatch, getState) => {
            this.accountApi.modifyAccount(tokenID, link, username, password, auth)
                .then((res) => {
                    dispatch(this.successModifyAccount(res.data))
                    dispatch(this.getAccounts(tokenID))
                })
                .catch(err => {
                    dispatch(this.failureModifyAccount(err))
                })
        }
    }

    deleteAccount (username: string, link: string, tokenID: string) {
        return (dispatch, getState) => {
            this.accountApi.deleteAccount(username, link, tokenID)
                .then((res) => {
                    dispatch(this.successDeleteAccount(res.data))
                    dispatch(this.getAccounts(tokenID))
                })
                .catch(err => {
                    dispatch(this.failureDeleteAccount(err))
                })
        }
    }

    successGetAccounts = (data) => ({
        type: accountTypes.FETCH_SUCCESS,
        payload: {
            ...data
        }
    })

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

    failureGetAccounts = (error) => ({
        type: accountTypes.FETCH_FAILURE,
        payload: {
            error
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
}

export default new accountsActions(accountApi);