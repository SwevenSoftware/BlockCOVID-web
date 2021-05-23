import { combineReducers } from "redux"
import loginReducer from "./loginReducer"
import accountsReducer from "./accountsReducer"
import roomsReducer from "./roomsReducer"

const rootReducer = combineReducers({
	login: loginReducer,
	accounts: accountsReducer,
	rooms: roomsReducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
