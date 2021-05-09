import {
    newUserTypes
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
    type: newUserTypes.NEW_USER_SUCCESS,
    payload: {
        ...data
    }
})

const failureMessage = (error) => ({
    type: newUserTypes.NEW_USER_FAILURE,
    payload: {
        error
    }
})