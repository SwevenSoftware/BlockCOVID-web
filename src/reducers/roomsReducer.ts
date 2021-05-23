import { reducerFactory } from "./reducerFactory"
import { roomsHandlers } from "./handlers/roomsHandlers"

const initialState = {
	rooms: null,
	error: null,
}

export default reducerFactory(initialState, roomsHandlers)
