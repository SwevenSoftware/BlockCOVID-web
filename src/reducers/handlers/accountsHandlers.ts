import {
    accountTypes,
    ERROR_UNKNOWN,
    ERROR_USERNAME_NOT_AVAILABLE
} from "../../types"

export const accountsHandlers = {}

accountsHandlers[accountTypes.FETCH_SUCCESS] = function(state, action) {
    console.log(accountTypes.FETCH_SUCCESS)
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
}

accountsHandlers[accountTypes.CREATE_SUCCESS] = function(state, action) {
    console.log(accountTypes.CREATE_SUCCESS)
    return {
        ...state,
        error: ""
    }
}

accountsHandlers[accountTypes.MODIFY_SUCCESS] = function(state, action) {
    console.log(accountTypes.MODIFY_SUCCESS)
    return {
        ...state,
        error: ""
    }
}

accountsHandlers[accountTypes.DELETE_SUCCESS] = function(state, action) {
    console.log(accountTypes.DELETE_SUCCESS)
    if (action.payload.error) {
        return {
            ...state,
            error: ""
        }
    }
    else {
        return state
    }
}

accountsHandlers[accountTypes.FETCH_FAILURE] = function(state, action) {
    console.log(accountTypes.FETCH_FAILURE)
    if (action.payload.error) {
        return {
            users: null,
            error: ERROR_UNKNOWN,
            counter: null
        }
    }
    else {
        return state
    }
}

accountsHandlers[accountTypes.CREATE_FAILURE] = function(state, action) {
    console.log(accountTypes.CREATE_FAILURE)
    switch (action.payload.error) {
        case 409: /* user exists, username already taken */
            return {
                ...state,
                error: ERROR_USERNAME_NOT_AVAILABLE
            }
        default:
            return {
                ...state,
                error: ERROR_UNKNOWN
            }
    }
}

accountsHandlers[accountTypes.MODIFY_FAILURE] = function(state, action) {
    console.log(accountTypes.MODIFY_FAILURE)
    if (action.payload.error) {
        return {
            ...state,
            error: ERROR_UNKNOWN,
        }
    }
    else {
        return state
    }
}

accountsHandlers[accountTypes.DELETE_FAILURE] = function(state, action) {
    console.log(accountTypes.DELETE_FAILURE)
    if (action.payload.error) {
        return {
            ...state,
            error: ERROR_UNKNOWN,
        }
    }
    else {
        return state
    }
}