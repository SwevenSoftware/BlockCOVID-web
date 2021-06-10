import { reducerFactory } from "./reducerFactory"
import { reservationsHandlers } from "./handlers/reservationsHandlers"

const initialState = {
	reservations: null,
	error: null,
	loading: false,
}

export default reducerFactory(initialState, reservationsHandlers)
