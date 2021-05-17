import {
    loginTypes,
    ERROR_UNKNOWN,
    ERROR_USER_NO_AUTH,
    ERROR_USER_OR_PASS
} from "../../types"

const loginHandlers = {}

loginHandlers[loginTypes.LOGIN_SUCCESS] = function(state, action) {
    let isAdmin = action.payload.authorities.includes("ADMIN")
    if (isAdmin) { /** user has admin authorities, authorized login attempt */
        location.href = "/accounts"
        return {
            token: action.payload.token,
            error: ""
        }
    }
    else {  /** unauthorized login attempt */
        return {
            token: null,
            error: ERROR_USER_NO_AUTH
        }
    }
}

loginHandlers[loginTypes.LOGIN_FAILURE] = function(state, action) {
    switch (action.payload.error) {
        case 400: case 500:
            /**
             * 400: incorrect password
             * 500: incorrect username or user does not exist
            */
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

loginHandlers[loginTypes.LOGOUT] = function(state, action) {
    console.log(loginTypes.LOGOUT) // WARNING: testing purposes
    location.href = "/login"
    return {
        token: null,
        error: ""
    }
}

export default loginHandlers