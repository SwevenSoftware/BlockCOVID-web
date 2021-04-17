import {
  ACCOUNT_SUCCESS,
  ACCOUNT_FAILURE
} from "../types"

export const getAccounts = () => {
  return (dispatch, getState) => {
    console.log('current state:', getState()) // WARNING: testing purposes
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
