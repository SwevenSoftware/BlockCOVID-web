import { roomTypes } from "../types"
import {
    // TODO: add getRoom() in api
    // getRoom as getRoomAPI
    createRoom as createRoomAPI,
    modifyRoom as modifyRoomAPI,
    deleteRoom as deleteRoomAPI
} from '../api'

interface roomInformation {
    name: string,
    openingAt: string,
    closingAt: string,
    openingDays: string[],
    width: number,
    height: number
}

export const getRooms = () => {
    return (dispatch, getState) => {
        let tokenID = getState().login.token?.id
        if (tokenID) {
            // getRoomsAPI(tokenID)
            //     .then(res => {
            //         dispatch(successGetRooms(res.data))
            //     })
            //     .catch(err => {
            //         dispatch(failureGetRooms(err))
            //     })
        }
        else {
            dispatch(failureGetRooms(401))
        }
    }
}

export const createRoom = (data: roomInformation) => {
    return (dispatch, getState) => {
        let tokenID = getState().login.token?.id
        if (tokenID) {
            createRoomAPI(tokenID, data)
                .then((res) => {
                    dispatch(successCreateRoom(res.data))
                    // dispatch(getRooms())
                })
                .catch(err => {
                    dispatch(failureCreateRoom(err))
                })
        }
        else {
            dispatch(failureCreateRoom(401))
        }
    }
}

export const modifyRoom = (roomName: string, link: string, data: roomInformation) => {
    return (dispatch, getState) => {
        let tokenID = getState().login.token?.id
        if (tokenID) {
            modifyRoomAPI(tokenID, roomName, link, data)
                .then((res) => {
                    dispatch(successModifyRoom(res.data))
                    // dispatch(getRooms())
                })
                .catch(err => {
                    dispatch(failureModifyRoom(err))
                })
        }
        else {
            dispatch(failureModifyRoom(401))
        }
    }
}

export const deleteRoom = (roomName: string, link: string) => {
    return (dispatch, getState) => {
        let tokenID = getState().login.token?.id
        if (tokenID) {
            deleteRoomAPI(tokenID, roomName, link)
                .then((res) => {
                    dispatch(successDeleteRoom(res.data))
                    // dispatch(getRooms()
                })
                .catch(err => {
                    dispatch(failureDeleteRoom(err))
                })
        }
        else {
            dispatch(failureDeleteRoom(401))
        }
    }
}

const successGetRooms = (data) => ({
    type: roomTypes.FETCH_SUCCESS,
    payload: {
        ...data
    }
})

const successCreateRoom = (data) => ({
    type: roomTypes.CREATE_SUCCESS,
    payload: {
        ...data
    }
})

const successModifyRoom = (data) => ({
    type: roomTypes.MODIFY_SUCCESS,
    payload: {
        ...data
    }
})

const successDeleteRoom = (data) => ({
    type: roomTypes.DELETE_SUCCESS,
    payload: {
        ...data
    }
})

const failureGetRooms = (error) => ({
    type: roomTypes.FETCH_FAILURE,
    payload: {
        error
    }
})

const failureCreateRoom = (error) => ({
    type: roomTypes.CREATE_FAILURE,
    payload: {
        error
    }
})

const failureModifyRoom = (error) => ({
    type: roomTypes.MODIFY_FAILURE,
    payload: {
        error
    }
})

const failureDeleteRoom = (error) => ({
    type: roomTypes.DELETE_FAILURE,
    payload: {
        error
    }
})
