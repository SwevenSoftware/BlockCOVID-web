import counterReducer from './counter';
import loggedReducer from './loginReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
   counter: counterReducer,
   logged: loggedReducer,
   
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>