import {
    accountTypes
} from "../types"
import { getAccounts as getAccountsAPI } from '../api'

export const getAccounts = (tokenID: string) => {
    return (dispatch, getState) => {
        getAccountsAPI(tokenID)
            .then(res => {
                dispatch(success(res.data))
            })
            .catch(err => {
                dispatch(failure(err.response.status))
            })
    }
}

const success = (data) => ({
    type: accountTypes.ACCOUNTS_SUCCESS,
    payload: {
        ...data
    }
})

const failure = (error) => ({
    type: accountTypes.ACCOUNTS_FAILURE,
    payload: {
        error
    }
})
