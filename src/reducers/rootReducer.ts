import { combineReducers } from "redux"
import loginReducer from "./loginReducer"
import accountsReducer from "./accountsReducer"
import roomsReducer from "./roomsReducer"
import reportsReducer from "./reportReducer"

const rootReducer = combineReducers({
	login: loginReducer,
	accounts: accountsReducer,
	rooms: roomsReducer,
	reports: reportsReducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
