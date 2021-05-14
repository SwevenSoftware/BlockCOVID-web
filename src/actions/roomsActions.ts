import { roomTypes } from "../types"
import roomApi, { roomAPI } from '../Api/roomAPI'

export interface roomInformation {
    name: string,
    openingAt: string,
    closingAt: string,
    openingDays: string[],
    width: number,
    height: number
}

class roomActions {
    roomApi: roomAPI

    constructor(roomApi: roomAPI) {
        this.roomApi = roomApi
    }

    createRoom(data: roomInformation) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            this.roomApi.createRoom(tokenID, data)
                .then((res) => {
                    dispatch(this.successCreateRoom(res.data))
                })
                .catch(err => {
                    dispatch(this.failureCreateRoom(err))
                })
        }
    }

    modifyRoom(url: string, roomName: string, data: roomInformation) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            roomApi.modifyRoom(tokenID, url, { ...data, roomName: roomName})
                .then((res) => {
                    dispatch(this.successModifyRoom(res.data))
                })
                .catch(err => {
                    dispatch(this.failureModifyRoom(err))
                })
        }
    }

    deleteRoom(url: string, data: { roomName: string }) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            roomApi.deleteRoom(tokenID, url, data)
                .then((res) => {
                    dispatch(this.successDeleteRoom(res.data))
                })
                .catch(err => {
                    dispatch(this.failureDeleteRoom(err))
                })
        }
    }

    getRooms(data: { fromTimestamp: string, toTimestamp: string }) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            this.roomApi.getRooms(tokenID, data)
              .then(res => {
                  dispatch(this.successGetRooms(res.data))
              })
              .catch(err => {
                  dispatch(this.failureGetRooms(err))
              })
        }
    }

    successGetRooms = (data) => ({
        type: roomTypes.FETCH_SUCCESS,
        payload: {
            ...data
        }
    })

    successCreateRoom = (data) => ({
        type: roomTypes.CREATE_SUCCESS,
        payload: {
            ...data
        }
    })

    successModifyRoom = (data) => ({
        type: roomTypes.MODIFY_SUCCESS,
        payload: {
            ...data
        }
    })

    successDeleteRoom = (data) => ({
        type: roomTypes.DELETE_SUCCESS,
        payload: {
            ...data
        }
    })

    failureGetRooms = (error) => ({
        type: roomTypes.FETCH_FAILURE,
        payload: {
            error
        }
    })

    failureCreateRoom = (error) => ({
        type: roomTypes.CREATE_FAILURE,
        payload: {
            error
        }
    })

    failureModifyRoom = (error) => ({
        type: roomTypes.MODIFY_FAILURE,
        payload: {
            error
        }
    })

    failureDeleteRoom = (error) => ({
        type: roomTypes.DELETE_FAILURE,
        payload: {
            error
        }
    })
}

export default new roomActions(roomApi)