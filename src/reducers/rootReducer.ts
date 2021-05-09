import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import accountsReducer from './accountsReducer'

const rootReducer = combineReducers({
    login: loginReducer,
    accounts: accountsReducer
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
