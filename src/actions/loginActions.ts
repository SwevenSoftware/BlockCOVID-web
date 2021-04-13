import axios from 'axios'

export const login = () => {
   return {
     type: 'SIGN_IN',
    }
}

export const loginUsernamePassword = (username: string, password: string) => {
   return {
     type: 'SIGN_IN_UP',
     payload: {
       username: username,
       password: password
     }
   }
}

export const logout = () => {
   return { type: 'SIGN_OUT' }
}

export const loginActions = ( {username, password }) => {
  return (dispatch, getState) => {

    console.log('current state:', getState());
    const config = {
      headers: { "Content-Type": "application/json"}
    };
    //  axios.post("/api/login", JSON.stringify({username, password}), config);

    console.log(JSON.stringify({username, password}))
    axios
      .post("/api/login",
        JSON.stringify({username, password}),
        config)
      .then(res => {
        console.log('then');
        dispatch(loginSuccess(res.data));
        
        
      })
      .catch(err => {
        console.log('catch');
        dispatch(loginFailure(err.message));
        
      });
  };
};

const loginSuccess = todo => ({
  type: LOGIN_SUCCESS,
  payload: {
    ...todo
  }
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: {
    error
  }
});

const LOGIN_SUCCESS = "SUCCESS"
const LOGIN_FAILURE = "FAILURE"
const ADD_TODO_STARTED = "STARTED"
const DELETE_TODO = "DELETE"
