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

export class roomActions {
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
                    dispatch(this.getRooms({ fromTimestamp: '', toTimestamp: '' }))
                })
                .catch(err => {
                    dispatch(this.failureCreateRoom(err.response.status))
                })
        }
    }

    modifyRoom(url: string, roomName: string, data: roomInformation) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            this.roomApi.modifyRoom(tokenID, url, { ...data, roomName: roomName })
                .then((res) => {
                    dispatch(this.successModifyRoom(res.data))
                    dispatch(this.getRooms({ fromTimestamp: '', toTimestamp: '' }))
                })
                .catch(err => {
                    dispatch(this.failureModifyRoom(err.response.status))
                })
        }
    }

    deleteRoom(url: string, data: { roomName: string }) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            this.roomApi.deleteRoom(tokenID, url, data)
                .then((res) => {
                    dispatch(this.successDeleteRoom(res.data))
                    dispatch(this.getRooms({ fromTimestamp: '', toTimestamp: '' }))
                })
                .catch(err => {
                    dispatch(this.failureDeleteRoom(err.response.status))
                })
        }
    }

    getRooms(data: { fromTimestamp: string, toTimestamp: string }) {
        return (dispatch, getState) => {
            let tokenID = getState().login.token?.id
            let dataToDispatch = data
            if (!(data.fromTimestamp && data.toTimestamp)) {
                let today: Date = new Date()
                let todayDate: string = today.getFullYear() + '-' +
                    (today.getMonth() < 10 ? '0' + today.getMonth() : today.getMonth()) + '-' +
                    (today.getDate() < 10 ? '0' + today.getDate() : today.getDate())
                let todayTime: string =
                    (today.getHours() < 10 ? "0" + today.getHours().toString() : today.getHours().toString()) +
                    ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes().toString() : today.getMinutes().toString())
                let todayString: string = todayDate + 'T' + todayTime
                dataToDispatch = { fromTimestamp: todayString, toTimestamp: todayString }
            }
            this.roomApi.getRooms(tokenID, dataToDispatch)
                .then(res => {
                    dispatch(this.successGetRooms(res.data))
                })
                .catch(err => {
                    dispatch(this.failureGetRooms(err.response.status))
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