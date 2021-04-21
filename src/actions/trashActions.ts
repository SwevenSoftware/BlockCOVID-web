import {
  TRASH_CANCEL,
  TRASH_ACCOUNTS_SUCCESS,
  TRASH_FAILURE
} from "../types"
import { deleteAccount as deleteAccountAPI } from '../api';

export const trashCancel = (isOpen: boolean) => {
  return {
    type: TRASH_CANCEL,
    payload: {
      isOpen: false
    }
  }
}

export const deleteAccount = (username: string, link_delete: string, tokenID: string) => {
  return (dispatch, getState) => {
    deleteAccountAPI(username, link_delete, tokenID)
      .then((res) => {
        dispatch(successAccount(res.data))
      })
      .catch(err => {
        dispatch(failure(err))
      })
  }
}

const successAccount = (data) => ({
  type: TRASH_ACCOUNTS_SUCCESS,
  payload: {
    ...data
  }
})

const failure = (error) => ({
  type: TRASH_FAILURE,
  payload: {
    error
  }
})
