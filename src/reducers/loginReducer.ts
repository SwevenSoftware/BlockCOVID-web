import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  ERROR_USER_NO_AUTH,
  ERROR_USER_OR_PASS,
  ERROR_UNKNOWN
} from "../types"

import { push } from "react-router-redux"

const initialState = {
  token: null,
  error: null
 };

export default function loginReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      console.log(LOGIN_SUCCESS) // WARNING: testing purposes
      let isAdmin = action.payload.authorities.includes("ADMIN");
      if(isAdmin) { /* user has admin authorities, authorized login attempt */
        location.href = "/accounts";
        return {
          token: action.payload.token,
          error: null
        }
      }
      else {  /* unauthorized login attempt */
        return {
          error: ERROR_USER_NO_AUTH
        }
      }
    case LOGIN_FAILURE:
      console.log(LOGIN_FAILURE) // WARNING: testing purposes
      switch(action.payload.error) {
        case 400: case 500:
          /* 400: incorrect
          500: incorrect username or user does not exists */
          return {
            error: ERROR_USER_OR_PASS
          }
        default:
          return {
            error: ERROR_UNKNOWN
          }
      }
    case LOGOUT:
      return {
        token: null
      }
    default:
      return state;
  }
}
