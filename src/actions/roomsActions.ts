import { roomTypes } from "../types"
import roomApi, {
	roomAPI,
	RoomInformation,
	DeskInformation,
} from "../Api/roomAPI"

export class roomActions {
	roomApi: roomAPI

	constructor(roomApi: roomAPI) {
		this.roomApi = roomApi
	}

	createRoom(data: RoomInformation) {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			this.roomApi
				.createRoom(tokenID, data)
				.then((res) => {
					dispatch(this.successCreateRoom(res.data))
					dispatch(
						this.getRooms({ fromTimestamp: "", toTimestamp: "" })
					)
				})
				.catch((err) => {
					dispatch(this.failureCreateRoom(err.response.status))
				})
		}
	}

	modifyRoom(roomName: string, data: RoomInformation) {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			this.roomApi
				.modifyRoom(tokenID, { ...data, roomName: roomName })
				.then((res) => {
					dispatch(this.successModifyRoom(res.data))
					dispatch(
						this.getRooms({ fromTimestamp: "", toTimestamp: "" })
					)
				})
				.catch((err) => {
					dispatch(this.failureModifyRoom(err.response.status))
				})
		}
	}

	deleteRoom(url: string, data: { roomName: string }) {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			this.roomApi
				.deleteRoom(tokenID, url, data)
				.then((res) => {
					dispatch(this.successDeleteRoom(res.data))
					dispatch(
						this.getRooms({ fromTimestamp: "", toTimestamp: "" })
					)
				})
				.catch((err) => {
					dispatch(this.failureDeleteRoom(err.response.status))
				})
		}
	}

	getRooms(data: { fromTimestamp: string; toTimestamp: string }) {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			let dataToDispatch = data
			if (!(data.fromTimestamp && data.toTimestamp)) {
				let today: Date = new Date()
				let todayDate: string =
					today.getFullYear() +
					"-" +
					(today.getMonth()+1 < 10
						? "0" + (today.getMonth()+1)
						: (today.getMonth()+1)) +
					"-" +
					(today.getDate() < 10
						? "0" + today.getDate()
						: today.getDate())
				let todayTime: string =
					(today.getHours() < 10
						? "0" + today.getHours().toString()
						: today.getHours().toString()) +
					":" +
					(today.getMinutes() < 10
						? "0" + today.getMinutes().toString()
						: today.getMinutes().toString())
				let todayString: string = todayDate + "T" + todayTime
				dataToDispatch = {
					fromTimestamp: todayString,
					toTimestamp: todayString,
				}
			}
			this.roomApi
				.getRooms(tokenID, dataToDispatch)
				.then((res) => {
					dispatch(this.successGetRooms(res.data))
				})
				.catch((err) => {
					dispatch(this.failureGetRooms(err.response.status))
				})
		}
	}

	createDesks(data: { roomName: string; desks: [{ x: number; y: number }] }) {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			this.roomApi
				.createDesks(tokenID, data)
				.then((res) => {
					dispatch(this.successCreateDesks(res.data))
					dispatch(
						this.getRooms({ fromTimestamp: "", toTimestamp: "" })
					)
				})
				.catch((err) => {
					dispatch(this.failureCreateDesks(err.response.status))
				})
		}
	}

	modifyDesk(data: {
		roomName: string
		desk: { oldInfo: DeskInformation; newInfo: DeskInformation }
	}) {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			this.roomApi
				.modifyDesk(tokenID, data)
				.then((res) => {
					dispatch(this.successModifyDesk(res.data))
					dispatch(
						this.getRooms({ fromTimestamp: "", toTimestamp: "" })
					)
				})
				.catch((err) => {
					dispatch(this.failureModifyDesk(err.response.status))
				})
		}
	}

	deleteDesk(data: { roomName: string; desksId: Array<string> }) {
		return (dispatch, getState) => {
			let tokenID = getState().login.token?.id
			this.roomApi
				.deleteDesk(tokenID, data)
				.then((res) => {
					dispatch(this.successDeleteDesk(res.data))
					dispatch(
						this.getRooms({ fromTimestamp: "", toTimestamp: "" })
					)
				})
				.catch((err) => {
					dispatch(this.failureDeleteDesk(err.response.status))
				})
		}
	}

	successCreateRoom = (data) => ({
		type: roomTypes.CREATE_SUCCESS,
		payload: {
			...data,
		},
	})

	successCreateDesks = (data) => ({
		type: roomTypes.CREATE_DESKS_SUCCESS,
		payload: {
			...data,
		},
	})

	successModifyRoom = (data) => ({
		type: roomTypes.MODIFY_SUCCESS,
		payload: {
			...data,
		},
	})

	successModifyDesk = (data) => ({
		type: roomTypes.MODIFY_DESK_SUCCESS,
		payload: {
			...data,
		},
	})

	successDeleteRoom = (data) => ({
		type: roomTypes.DELETE_SUCCESS,
		payload: {
			...data,
		},
	})

	successDeleteDesk = (data) => ({
		type: roomTypes.DELETE_DESK_SUCCESS,
		payload: {
			...data,
		},
	})

	successGetRooms = (data) => ({
		type: roomTypes.FETCH_SUCCESS,
		payload: {
			...data,
		},
	})

	failureCreateRoom = (error) => ({
		type: roomTypes.CREATE_FAILURE,
		payload: {
			error,
		},
	})

	failureCreateDesks = (error) => ({
		type: roomTypes.CREATE_DESKS_FAILURE,
		payload: {
			error,
		},
	})

	failureModifyRoom = (error) => ({
		type: roomTypes.MODIFY_FAILURE,
		payload: {
			error,
		},
	})

	failureModifyDesk = (error) => ({
		type: roomTypes.MODIFY_DESK_FAILURE,
		payload: {
			error,
		},
	})

	failureDeleteRoom = (error) => ({
		type: roomTypes.DELETE_FAILURE,
		payload: {
			error,
		},
	})

	failureDeleteDesk = (error) => ({
		type: roomTypes.DELETE_DESK_FAILURE,
		payload: {
			error,
		},
	})

	failureGetRooms = (error) => ({
		type: roomTypes.FETCH_FAILURE,
		payload: {
			error,
		},
	})
}

export default new roomActions(roomApi)
