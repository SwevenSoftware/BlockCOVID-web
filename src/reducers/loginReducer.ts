import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    ERROR_USER_NO_AUTH,
    ERROR_USER_OR_PASS,
    ERROR_UNKNOWN,
    LOGIN_LOGOUT_SUCCESS
} from "../types"
import { Reducer } from 'redux'

interface loginState {
    token: any,
    error: string
}

const initialState: loginState = {
    token: null,
    error: ""
}

const loginReducer: Reducer<loginState> = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log(LOGIN_SUCCESS) // WARNING: testing purposes
            let isAdmin = action.payload.authorities.includes("ADMIN")
            if (isAdmin) { /* user has admin authorities, authorized login attempt */
                location.href = "/accounts"
                return {
                    token: action.payload.token,
                    error: ""
                }
            }
            else {  /* unauthorized login attempt */
                return {
                    token: null,
                    error: ERROR_USER_NO_AUTH
                }
            }
        case LOGIN_FAILURE:
            console.log(LOGIN_FAILURE) // WARNING: testing purposes
            switch (action.payload.error) {
                case 400: case 500:
                    /* 400: incorrect
                    500: incorrect username or user does not exists */
                    return {
                        token: null,
                        error: ERROR_USER_OR_PASS
                    }
                default:
                    return {
                        token: null,
                        error: ERROR_UNKNOWN
                    }
            }
        case LOGIN_LOGOUT_SUCCESS:
            location.href = "/login"
            return {
                token: null,
                error: ""
            }
        default:
            return state
    }
}

export default loginReducer