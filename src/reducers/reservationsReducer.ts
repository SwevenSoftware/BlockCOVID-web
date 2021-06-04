import { reducerFactory } from "./reducerFactory"
import { reservationsHandlers } from "./handlers/reservationsHandlers"

const initialState = {
	reservations: null,
	error: null,
}

export default reducerFactory(initialState, reservationsHandlers)