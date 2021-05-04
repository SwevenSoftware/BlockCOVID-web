import {
   NEW_USER_SUCCESS,
   NEW_USER_FAILURE,
   ERROR_USERNAME_NOT_AVAILABLE
} from "../types"

const initialState = {
   error: null,
}

export default function newUserReducer(state = initialState, action) {
   switch(action.type) {
      case NEW_USER_SUCCESS:
         //console.log("utente creato con successo")
         return {
            error: null
         }
      break;
      case NEW_USER_FAILURE:
         //console.log("impossibile creare utente")
         switch(action.payload.error) {
            case 409: /* user exists, username already taken */
            return {
               error: ERROR_USERNAME_NOT_AVAILABLE
            }
         }
      break;
      default:
         return state
   }
}