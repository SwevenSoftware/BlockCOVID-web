import { roomTypes } from "../types";
import roomApi, { roomAPI } from '../Api/roomAPI';

export interface roomInformation {
    name: string,
    openingAt: string,
    closingAt: string,
    openingDays: string[],
    width: number,
    height: number
}

export class roomActions {
    roomApi: roomAPI;

    constructor(roomApi: roomAPI) {
        this.roomApi = roomApi;
    }

    getRooms (fromTimestamp: string, toTimestamp: string) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            this.roomApi.getRooms(tokenID, fromTimestamp, toTimestamp)
                .then(res => {
                    dispatch(this.successGetRooms(res.data))
                })
                .catch(err => {
                    dispatch(this.failureGetRooms(err))
                })
        }
    }

    createRoom (data: roomInformation) {
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

    modifyRoom (roomName: string, link: string, data: roomInformation) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            roomApi.modifyRoom(tokenID, roomName, link, data)
                .then((res) => {
                    dispatch(this.successModifyRoom(res.data))
                })
                .catch(err => {
                    dispatch(this.failureModifyRoom(err))
                })
        }
    }

    deleteRoom (roomName: string, link: string) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            roomApi.deleteRoom(tokenID, roomName, link)
                .then((res) => {
                    dispatch(this.successDeleteRoom(res.data))
                })
                .catch(err => {
                    dispatch(this.failureDeleteRoom(err))
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

export default new roomActions(roomApi);