import {
    roomTypes,
    ERROR_UNKNOWN,
    ERROR_ROOM_DOES_NOT_EXIST
} from "../../types"

export const roomsHandlers = {}

roomsHandlers[roomTypes.FETCH_SUCCESS] = function(state, action) {
    console.log(roomTypes.FETCH_SUCCESS)
    return {
        rooms: action.payload?._embedded?.roomWithDesksList,
        error: ""
    }
}

roomsHandlers[roomTypes.CREATE_SUCCESS] = function(state, action) {
    console.log(roomTypes.CREATE_SUCCESS)
    return {
        ...state,
        error: ""
    }
}

roomsHandlers[roomTypes.MODIFY_SUCCESS] = function(state, action) {
    console.log(roomTypes.MODIFY_SUCCESS)
    return {
        ...state,
        error: ""
    }
}

roomsHandlers[roomTypes.DELETE_SUCCESS] = function(state, action) {
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

roomsHandlers[roomTypes.FETCH_FAILURE] = function(state, action) {
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

roomsHandlers[roomTypes.CREATE_FAILURE] = function(state, action) {
    console.log(roomTypes.CREATE_FAILURE)
    switch (action.payload.error) {
        default:
            return {
                ...state,
                error: ERROR_UNKNOWN
            }
    }
}

roomsHandlers[roomTypes.MODIFY_FAILURE] = function(state, action) {
    console.log(roomTypes.MODIFY_FAILURE)
    switch (action.payload.error) {
        case 404: /** room does not exist */
            return {
                ...state,
                error: ERROR_ROOM_DOES_NOT_EXIST
            }
        default:
            return {
                ...state,
                error: ERROR_UNKNOWN
            }
    }
}

roomsHandlers[roomTypes.DELETE_FAILURE] = function(state, action) {
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
