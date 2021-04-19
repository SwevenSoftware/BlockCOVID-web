import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOGOUT
} from "../types"
import { login as loginAPI } from '../api'

export const login = ({username, password}) => {
  return (dispatch, getState) => {
    loginAPI({username, password})
      .then(res => {
        dispatch(success(res.data))
      })
      .catch(err => {
        dispatch(failure(err.response.status))
      })
  }
}

export const logout = () => {
   return {
     type: LOGIN_LOGOUT
   }
}

const success = (data) => ({
  type: LOGIN_SUCCESS,
  payload: {
    ...data
  }
})

const failure = (error) => ({
  type: LOGIN_FAILURE,
  payload: {
    error
  }
})
