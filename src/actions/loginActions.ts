import { login as loginAPI } from '../api'
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOGOUT
} from "../types"

export const login = ({username, password}) => {
  return (dispatch, getState) => {
    console.log('current state:', getState()); // WARNING: testing purposes
    console.log(JSON.stringify({username, password})) // WARNING: testing purposes

    // const config = {
    //   headers: { "Content-Type": "application/json"}
    // };
    //
    // axios
    //   .post("/api/login",
    //     JSON.stringify({username, password}),
    //     config)
    loginAPI({username, password})
      .then(res => {
        dispatch(success(res.data));
      })
      .catch(err => {
        dispatch(failure(err.response.status));
      });
  };
};

export const logout = () => {
   return {
     type: LOGIN_LOGOUT
   }
}

const success = (data) => ({
  type: LOGIN_SUCCESS,
  payload: {
    ...data
  }
});

const failure = (error) => ({
  type: LOGIN_FAILURE,
  payload: {
    error
  }
});
