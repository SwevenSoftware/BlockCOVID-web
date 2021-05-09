import {
  ACCOUNTS_SUCCESS,
  ACCOUNTS_FAILURE,
  ERROR_UNKNOWN
} from "../types"

const initialState = {
  users: null,
  error: "",
  counter: {
    accounts: 0,
    admins: 0,
    users: 0,
    cleaners: 0
  }
}

export default function accountsReducer(state = initialState, action) {
  switch(action.type) {
    case ACCOUNTS_SUCCESS:
      console.log(ACCOUNTS_SUCCESS) // WARNING: testing purposes
      return {
        users: action.payload._embedded.userList,
        error: "",
        counter: {
          accounts: action.payload._embedded.userList.length,
          admins: action.payload._embedded.userList.reduce((acc, cur) => cur.authorities.includes("ADMIN") ? ++acc : acc, 0),
          users: action.payload._embedded.userList.reduce((acc, cur) => cur.authorities.includes("USER") ? ++acc : acc, 0),
          cleaners: action.payload._embedded.userList.reduce((acc, cur) => cur.authorities.includes("CLEANER") ? ++acc : acc, 0)
        }
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
