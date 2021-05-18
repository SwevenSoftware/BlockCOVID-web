import {
    roomTypes,
    ERROR_UNKNOWN
} from "../../types"

export const roomsHandlers = {}

roomsHandlers[roomTypes.FETCH_SUCCESS] = function(state, action) {
    return {
        rooms: action.payload,
        error: ""
    }
}

roomsHandlers[roomTypes.CREATE_SUCCESS] = function(state, action) {
    return {
        ...state,
        error: ""
    }
}

roomsHandlers[roomTypes.MODIFY_SUCCESS] = function(state, action) {
    return {
        ...state,
        error: ""
    }
}

roomsHandlers[roomTypes.DELETE_SUCCESS] = function(state, action) {
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

roomsHandlers[roomTypes.FETCH_FAILURE] = function(state, action) {
    if (action.payload.error) {
        return {
            rooms: null,
            error: ERROR_UNKNOWN
        }
    }
    else {
        return state
    }
}

roomsHandlers[roomTypes.CREATE_FAILURE] = function(state, action) {
    switch (action.payload.error) {
        default:
            return {
                ...state,
                error: ERROR_UNKNOWN
            }
    }
}

roomsHandlers[roomTypes.MODIFY_FAILURE] = function(state, action) {
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

roomsHandlers[roomTypes.DELETE_FAILURE] = function(state, action) {
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
