import {
  ACCOUNTS_SUCCESS,
  ACCOUNTS_FAILURE,
  ERROR_UNKNOWN
} from "../types"

const initialState = {
  users: null,
  error: null
}

export default function accountsReducer(state = initialState, action) {
  switch(action.type) {
    case ACCOUNTS_SUCCESS:
      console.log(ACCOUNTS_SUCCESS) // WARNING: testing purposes
      return {
        users: action.payload._embedded.userList
      }
    case ACCOUNTS_FAILURE:
      console.log(ACCOUNTS_FAILURE) // WARNING: testing purposes
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
