import counterReducer from './counterReducer';
import loggedReducer from './loginReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
   counter: counterReducer,
   login: loggedReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
