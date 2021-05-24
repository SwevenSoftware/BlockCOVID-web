import { reducerFactory } from "./reducerFactory"
import { reportsHandlers } from "./handlers/reportsHandlers"

export const initialState = {
	reports: null,
	error: "",
}

export default reducerFactory(initialState, reportsHandlers)
