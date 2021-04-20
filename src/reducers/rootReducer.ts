import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import accountsReducer from './accountsReducer'
import trashReducer from './trashReducer'

const rootReducer = combineReducers({
   login: loginReducer,
   accounts: accountsReducer,
   trash: trashReducer
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
