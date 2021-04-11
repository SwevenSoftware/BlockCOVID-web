import { connect } from 'react-redux';
import { RootState } from './reducers/rootReducer';
import Example from './components/Example';
import Login from './components/Login';

import {addTodo} from './actions/loginActions'


export const ConnectedExample =
  connect((state: RootState) => ({
    counter: state.counter,
    isLogged: state.login.isLogged
  }))(Example);

/* export const ConnectedLogin =
  connect((state: RootState) => ({
    login: state.login
  }))(Login); */

export const mapDispatchToProps = (dispatch) => {

  console.log("connectedComponents")
  return {
    onAddTodo: todo => {
      dispatch(addTodo(todo));
    }
  };
};

export const ConnectedLogin = connect(
    null,
    mapDispatchToProps
  )(Login);
