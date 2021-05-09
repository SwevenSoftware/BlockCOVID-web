import { accountTypes, ERROR_UNKNOWN } from "../../types";

export const accountHandlers = {}

accountHandlers[accountTypes.ACCOUNTS_SUCCESS] = function(state, action) {
    console.log(accountTypes.ACCOUNTS_SUCCESS);
    return {
        users: action.payload._embedded.userList,
        error: "",
        counter: {
            accounts: action.payload._embedded.userList.length,
            admins: action.payload._embedded.userList.reduce((acc, cur) => cur.authorities.includes("ADMIN") ? ++acc : acc, 0),
            users: action.payload._embedded.userList.reduce((acc, cur) => cur.authorities.includes("USER") ? ++acc : acc, 0),
            cleaners: action.payload._embedded.userList.reduce((acc, cur) => cur.authorities.includes("CLEANER") ? ++acc : acc, 0)
          }
    };
}

accountHandlers[accountTypes.ACCOUNTS_FAILURE] = function(state, action) {
    if (action.payload.error) {
        return {
            users: null,
            error: ERROR_UNKNOWN,
            counter: null
        }
    } return state;
}