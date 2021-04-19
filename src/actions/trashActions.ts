import { trashConfirm as trashConfirmAPI }  from '../api';
import {
   TRASH_CANCEL,
   TRASH_CONFIRM,
   TRASH_FAILURE,
   TRASH_SUCCESS,
   ERROR_USER_CANNOT_BE_DELETED
} from "../types"

export const trashCancel = (isOpen: boolean) => {
   return {
      type: TRASH_CANCEL,
      payload: {
         isOpen: false
      }
   }
}

export const trashConfirm = ({username, link_delete}) => {
   return (dispatch, getState) => {
      trashConfirmAPI({username, link_delete})
         .then((res) => {
            dispatch(successMessage(res.data))
         })
         .catch(err => {
            dispatch(failureMessage(err))
         })
   }
}
const successMessage = (data) => ({
   type: TRASH_SUCCESS,
   payload: {
      ...data
   }
})

const failureMessage = (error) => ({
   type: TRASH_FAILURE,
   payload: {
      error
   }
})