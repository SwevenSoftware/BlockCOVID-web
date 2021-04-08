import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
   counter: exampleReducer, // WARNING: read comment below
   login: loginReducer
});
// counter serves as a temporary example, if removed be cautious in ./App.tsx (connect)

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>