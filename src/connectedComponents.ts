import { connect } from 'react-redux';
import { RootState } from './reducers/rootReducer';
import Example from './components/Example';
import Login from './components/LoginComponent';
import Account from './components/AccountComponent';

import {loginInfo} from './actions/loginActions'
import { info } from 'node:console';


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
    putInfoLogin: info => {
      dispatch(loginInfo(info));
    }
  };
};

export const ConnectedLogin = connect(
    null,
    mapDispatchToProps
  )(Login);


export const AccountDispatchProps = (dispatch) => {

  console.log("accountsComponents")
  return {
    putInfoLogin: info => {
      dispatch(loginInfo(info));
    }
  };
};

export const ConnectedAccount = connect(
  null,
  AccountDispatchProps
)(Account);


export const ReservationDispatchProps = (dispatch) => {

  console.log("reservationsComponents")
  return {
    putInfoLogin: info => {
      dispatch(loginInfo(info));
    }
  };
};

export const ConnectedReservations = connect(
  null,
  AccountDispatchProps
)(Account);

export const RoomsDispatchProps = (dispatch) => {

  console.log("reservationsComponents")
  return {
    putInfoLogin: info => {
      dispatch(loginInfo(info));
    }
  };
};

export const ConnectedRooms = connect(
  null,
  AccountDispatchProps
)(Account);
