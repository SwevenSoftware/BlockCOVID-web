import {} from '../api'
import {
   TRASH_CANCEL,
   TRASH_CONFIRM,
   TRASH_FAILURE,
   TRASH_SUCCESS,
   ERROR_USER_CANNOT_BE_DELETED
} from "../types"

export const cancelTrash = (isOpen: boolean) => {
   return {
      type: TRASH_CANCEL,
      payload: {
         isOpen: false
      }
   }
}