import { accountTypes, ERROR_UNKNOWN } from "../../types";

export const accountHandlers = {}

accountHandlers[accountTypes.ACCOUNTS_SUCCESS] = function(state, action) {
    console.log(accountTypes.ACCOUNTS_SUCCESS);
    return {
        users: action.payload._embedded.userList
    };
}

accountHandlers[accountTypes.ACCOUNTS_FAILURE] = function(state, action) {
    if (action.payload.error) {
        return {
            error: ERROR_UNKNOWN,
        }
    } return state;
}