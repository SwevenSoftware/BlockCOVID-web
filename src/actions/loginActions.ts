import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
    LOGIN_LOGOUT_SUCCESS
} from "../types"
import { login as loginAPI, logout as logoutAPI } from '../api'

export const login = ({ username, password }) => {
    return (dispatch, getState) => {
        loginAPI({ username, password })
            .then(res => {
                dispatch(success(res.data))
            })
            .catch(err => {
                dispatch(failure(err.response.status))
            })
    }
}

export const logout = (tokenID: string) => {
    return (dispatch, gestState) => {
        logoutAPI(tokenID)
            .then(res => {
                dispatch(successLogout(res.data))
            })
            .catch(err => {
                dispatch(failure(err.response.status))
            })
    }
}

const success = (data) => ({
    type: LOGIN_SUCCESS,
    payload: {
        ...data
    }
})

const successLogout = (data) => ({
    type: LOGIN_LOGOUT_SUCCESS,
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
