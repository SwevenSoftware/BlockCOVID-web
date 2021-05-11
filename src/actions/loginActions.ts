import { loginTypes } from "../types"
import { login as loginAPI, logout as logoutAPI } from '../api'

export const login = ({ username, password }) => {
    return (dispatch, getState) => {
        loginAPI({ username, password })
            .then(res => {
                dispatch(successLogin(res.data))
            })
            .catch(err => {
                dispatch(failureLogin(err.response.status))
            })
    }
}

export const logout = (tokenID: string) => {
    return (dispatch, getState) => {
        logoutAPI(getState().login.token?.id)
            .then(res => {
                dispatch(successLogout(res.data))
            })
            .catch(err => {
                dispatch(failureLogout(err.response.status))
            })
    }
}

const successLogin = (data) => ({
    type: loginTypes.LOGIN_SUCCESS,
    payload: {
        ...data
    }
})

const successLogout = (data) => ({
    type: loginTypes.LOGOUT_SUCCESS,
    payload: {
        ...data
    }
})

const failureLogin = (error) => ({
    type: loginTypes.LOGIN_FAILURE,
    payload: {
        error
    }
})

const failureLogout = (error) => ({
    type: loginTypes.LOGOUT_FAILURE,
    payload: {
        error
    }
})