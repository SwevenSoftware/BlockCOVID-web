import {} from '../api'
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

export const trashConfirm = ({username, password}) => {
   return (dispatch, getState) => {
      
   }
}