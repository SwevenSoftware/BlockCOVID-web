import { ERROR_USERNAME_NOT_AVAILABLE, newUserTypes } from "../../types";

const newUserHandlers = {}

newUserHandlers[newUserTypes.NEW_USER_SUCCESS] = function(state, action) {
    return {
        error: null
    }
}

newUserHandlers[newUserTypes.NEW_USER_FAILURE] = function(state, action) {
    switch (action.payload.error) {
        case 409: /* user exists, username already taken */
            return {
                error: ERROR_USERNAME_NOT_AVAILABLE
            }
        default:
            return state
    }
}

export default newUserHandlers;