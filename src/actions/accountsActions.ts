import {accountTypes} from "../types"
import {
    getAccounts as getAccountsAPI,
    createAccount as createAccountAPI,
    modifyAccount as modifyAccountAPI,
    deleteAccount as deleteAccountAPI
} from '../api'

export const getAccounts = (tokenID: string) => {
    return (dispatch, getState) => {
        getAccountsAPI(tokenID)
            .then(res => {
                dispatch(successGetAccounts(res.data))
            })
            .catch(err => {
                dispatch(failureGetAccounts(err.response.status))
            })
    }
}

export const createAccount = ({ tokenID, username, password, auth }) => {
    return (dispatch, getState) => {
        createAccountAPI(tokenID, username, password, auth)
          .then((res) => {
              dispatch(successCreateAccount(res.data))
              dispatch(getAccounts(tokenID))
          })
          .catch(err => {
              dispatch(failureCreateAccount(err))
          })
    }
}

export const modifyAccount = ({ tokenID, link, username, password, auth }) => {
    return (dispatch, getState) => {
        modifyAccountAPI(tokenID, link, username, password, auth)
          .then((res) => {
              dispatch(successModifyAccount(res.data))
              dispatch(getAccounts(tokenID))
          })
          .catch(err => {
              dispatch(failureModifyAccount(err))
          })
    }
}

export const deleteAccount = (username: string, link: string, tokenID: string) => {
    return (dispatch, getState) => {
        deleteAccountAPI(username, link, tokenID)
          .then((res) => {
              dispatch(successDeleteAccount(res.data))
              dispatch(getAccounts(tokenID))
          })
          .catch(err => {
              dispatch(failureDeleteAccount(err))
          })
    }
}

const successGetAccounts = (data) => ({
    type: accountTypes.FETCH_SUCCESS,
    payload: {
        ...data
    }
})

const successCreateAccount = (data) => ({
    type: accountTypes.CREATE_SUCCESS,
    payload: {
        ...data
    }
})

const successModifyAccount = (data) => ({
    type: accountTypes.MODIFY_SUCCESS,
    payload: {
        ...data
    }
})

const successDeleteAccount = (data) => ({
    type: accountTypes.DELETE_SUCCESS,
    payload: {
        ...data
    }
})

const failureGetAccounts = (error) => ({
    type: accountTypes.FETCH_FAILURE,
    payload: {
        error
    }
})

const failureCreateAccount = (error) => ({
    type: accountTypes.CREATE_FAILURE,
    payload: {
        error
    }
})

const failureModifyAccount = (error) => ({
    type: accountTypes.MODIFY_FAILURE,
    payload: {
        error
    }
})

const failureDeleteAccount = (error) => ({
    type: accountTypes.DELETE_FAILURE,
    payload: {
        error
    }
})
