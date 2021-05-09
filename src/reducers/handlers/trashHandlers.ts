import { ERROR_UNKNOWN, trashTypes } from "../../types";

const trashHandlers = {};

trashHandlers[trashTypes.TRASH_ACCOUNTS_SUCCESS] = function(state, action) {
    console.log(trashTypes.TRASH_ACCOUNTS_SUCCESS) // WARNING: testing purposes
    return {
        error: null
    }
}

trashHandlers[trashTypes.TRASH_FAILURE] = function(state, action) {
    switch (action.payload.error) {
        default:
            return {
                error: ERROR_UNKNOWN
            }
    }
}

export default trashHandlers;