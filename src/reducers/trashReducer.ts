import {
   TRASH_CANCEL,
   TRASH_CONFIRM,
   TRASH_FAILURE,
   TRASH_SUCCESS,
   ERROR_USER_CANNOT_BE_DELETED
} from "../types"

const initialState = {
   error: null,
}

export default function trashReducer(state = initialState, action) {
   switch(action.type) {
      case TRASH_SUCCESS:
         console.log("eliminato con successo")
         return {
            error: null
         }
      break;
      case TRASH_CANCEL:
         console.log("annullata l'eliminazione")
      break;
      case TRASH_FAILURE:
         console.log("l'eliminazione è fallita contatta l'assistenza")
   }
}
