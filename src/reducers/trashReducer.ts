import {
   TRASH_ACCOUNTS_SUCCESS,
   TRASH_CANCEL,
   TRASH_FAILURE
} from "../types"

const initialState = {
   error: null
}

export default function trashReducer(state = initialState, action) {
   switch(action.type) {
      case TRASH_ACCOUNTS_SUCCESS:
         console.log("eliminato con successo")
         return {
            error: null
         }
      break;
      case TRASH_CANCEL:
         console.log("annullata l'eliminazione")
         return state
      break;
      case TRASH_FAILURE:
         console.log("l'eliminazione è fallita contatta l'assistenza")
         return state
   }
}
