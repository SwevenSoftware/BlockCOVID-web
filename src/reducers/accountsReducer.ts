import {
  ACCOUNT_SUCCESS,
  ACCOUNT_FAILURE,
  ERROR_UNKNOWN
} from "../types"

const initialState = {
  users: null,
  error: null
}

export default function accountsReducer(state = initialState, action) {
  switch(action.type) {
    case ACCOUNT_SUCCESS:
      console.log(ACCOUNT_SUCCESS) // WARNING: testing purposes
      return {
        users: action.payload._embedded.userList
      }
    case ACCOUNT_FAILURE:
      console.log(ACCOUNT_FAILURE) // WARNING: testing purposes
      switch(action.payload.error) {
        default:
          return {
            error: ERROR_UNKNOWN
          }
      }
    default:
      return state
   }
}
