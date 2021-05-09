import {
    NEW_USER_CONFIRM,
    NEW_USER_FAILURE,
    NEW_USER_SUCCESS,
    NEW_USER_CANCEL,
} from "../types"

import { createAccount } from "../api"
import { getAccounts } from './accountsActions'

export const newUserConfirm = ({ tokenID, username, password, auth }) => {
    return (dispatch, getState) => {
        createAccount(tokenID, username, password, auth)
            .then((res) => {
                dispatch(successMessage(res.data))
                dispatch(getAccounts(tokenID))
            })
            .catch(err => {
                dispatch(failureMessage(err))
            })
    }
}

const successMessage = (data) => ({
    type: NEW_USER_SUCCESS,
    payload: {
        ...data
    }
})

const failureMessage = (error) => ({
    type: NEW_USER_FAILURE,
    payload: {
        error
    }
})