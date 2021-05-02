import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import accountsReducer from './accountsReducer'
import newUserReducer from './newUserReducer'

const rootReducer = combineReducers({
   login: loginReducer,
   accounts: accountsReducer,
   newUser: newUserReducer
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
