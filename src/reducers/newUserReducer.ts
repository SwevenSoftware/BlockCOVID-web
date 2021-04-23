import {
   NEW_USER_SUCCESS,
   NEW_USER_FAILURE,
   NEW_USER_CONFIRM
} from "../types"

const initialState = {
   error: null,
}

export default function newUserReducer(state = initialState, action) {
   switch(action.type) {
      case NEW_USER_SUCCESS:
         console.log("utente creato con successo")
         return {
            error: null
         }
      break;
      case NEW_USER_FAILURE:
         console.log("annullata eliminazione")
      break;
      default:
         return state
   }
}