import { ERROR_UNKNOWN, ERROR_USER_NO_AUTH, ERROR_USER_OR_PASS, loginTypes } from "../../types";


const loginHandlers = {};

loginHandlers[loginTypes.LOGIN_SUCCESS] = function(state, action) {
    console.log(loginTypes.LOGIN_SUCCESS) // WARNING: testing purposes
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
}

loginHandlers[loginTypes.LOGIN_FAILURE] = function(state, action) {
    console.log(loginTypes.LOGIN_FAILURE) // WARNING: testing purposes
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
}

loginHandlers[loginTypes.LOGOUT_SUCCESS] = function(state, action) {
    location.href = "/login"
    return {
        token: null,
        error: ""
    }
}

loginHandlers[loginTypes.LOGOUT_FAILURE] = function(state, action) {
    console.log(loginTypes.LOGOUT_FAILURE) // WARNING: testing purposes
    switch (action.payload.error) {
        default:
            return {
                ...state,
                error: ERROR_UNKNOWN
            }
    }
}

export default loginHandlers;