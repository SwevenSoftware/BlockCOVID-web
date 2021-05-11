import {
    roomTypes,
    ERROR_UNKNOWN
} from "../../types"

export const roomHandlers = {}

roomHandlers[roomTypes.FETCH_SUCCESS] = function(state, action) {
    console.log(roomTypes.FETCH_SUCCESS)
    return {
        // TODO: return proper 'rooms' property
        rooms: action.payload._embedded.userList,
        error: ""
    }
}

roomHandlers[roomTypes.CREATE_SUCCESS] = function(state, action) {
    console.log(roomTypes.CREATE_SUCCESS)
    return {
        ...state,
        error: ""
    }
}

roomHandlers[roomTypes.MODIFY_SUCCESS] = function(state, action) {
    console.log(roomTypes.MODIFY_SUCCESS)
    return {
        ...state,
        error: ""
    }
}

roomHandlers[roomTypes.DELETE_SUCCESS] = function(state, action) {
    console.log(roomTypes.DELETE_SUCCESS)
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

roomHandlers[roomTypes.FETCH_FAILURE] = function(state, action) {
    console.log(roomTypes.FETCH_FAILURE)
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

roomHandlers[roomTypes.CREATE_FAILURE] = function(state, action) {
    console.log(roomTypes.CREATE_FAILURE)
    switch (action.payload.error) {
        default:
            return {
                ...state,
                error: ERROR_UNKNOWN
            }
    }
}

roomHandlers[roomTypes.MODIFY_FAILURE] = function(state, action) {
    console.log(roomTypes.MODIFY_FAILURE)
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

roomHandlers[roomTypes.DELETE_FAILURE] = function(state, action) {
    console.log(roomTypes.DELETE_FAILURE)
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
