import { reducerFactory } from "./reducerFactory"
import { roomHandlers } from "./handlers/roomHandlers"

const initialState = {
    rooms: null,
    error: null
}

export default reducerFactory(initialState, roomHandlers)
