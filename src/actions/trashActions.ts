import {
   TRASH_CANCEL,
   TRASH_CONFIRM,
   TRASH_FAILURE,
   TRASH_SUCCESS,
   ERROR_USER_CANNOT_BE_DELETED
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

export const deleteAccount = (username: string, link: string, token: string) => {
  return (dispatch, getState) => {
    deleteAccountAPI(username, link, token)
      .then((res) => {
        dispatch(successAccount(res.data))
      })
      .catch(err => {
        dispatch(failureAccount(err))
      })
  }
}

const successAccount = (data) => ({
  type: TRASH_SUCCESS,
  payload: {
    ...data
  }
})

const failureAccount = (error) => ({
  type: TRASH_FAILURE,
  payload: {
    error
  }
})
