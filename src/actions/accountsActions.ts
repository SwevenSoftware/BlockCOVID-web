import {
  ACCOUNTS_SUCCESS,
  ACCOUNTS_FAILURE
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
  type: ACCOUNTS_SUCCESS,
  payload: {
    ...data
  }
})

const failure = (error) => ({
  type: ACCOUNTS_FAILURE,
  payload: {
    error
  }
})
