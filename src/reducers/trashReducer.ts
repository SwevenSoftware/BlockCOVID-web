import {
  TRASH_ACCOUNTS_SUCCESS,
  TRASH_FAILURE,
  ERROR_UNKNOWN
} from "../types"

const initialState = {
  error: null
}

export default function trashReducer(state = initialState, action) {
  switch (action.type) {
    case TRASH_ACCOUNTS_SUCCESS:
      console.log(TRASH_ACCOUNTS_SUCCESS) // WARNING: testing purposes
      return {
        error: null
      }
    case TRASH_FAILURE:
      console.log(TRASH_FAILURE) // WARNING: testing purposes
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
