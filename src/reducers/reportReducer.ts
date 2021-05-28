import { reducerFactory } from "./reducerFactory"
import { reportHandlers } from "./handlers/reportHandlers"

export const initialState = {
	reports: null,
	error: "",
}

export default reducerFactory(initialState, reportHandlers)
