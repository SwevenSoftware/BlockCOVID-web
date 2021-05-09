import {
   PENCIL_SUCCESS,
   PENCIL_FAILURE,
} from '../types'

const initialState = {
   error: null,
}

export default function pencilReducer(state = initialState, action) {
   switch(action.type) {
      case PENCIL_SUCCESS:
         return {
            error: null
         }
      break;
      case PENCIL_FAILURE:
         return state
      break;
      default:
         return state
   }
}