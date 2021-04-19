import {
  ACCOUNT_SUCCESS,
  ACCOUNT_FAILURE
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
  type: ACCOUNT_SUCCESS,
  payload: {
    ...data
  }
})

const failure = (error) => ({
  type: ACCOUNT_FAILURE,
  payload: {
    error
  }
})
