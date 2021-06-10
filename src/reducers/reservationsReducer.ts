import { reducerFactory } from "./reducerFactory"
import { reservationsHandlers } from "./handlers/reservationsHandlers"

export const initialState = {
	reservations: null,
	error: "",
	loading: false,
}

export default reducerFactory(initialState, reservationsHandlers)
