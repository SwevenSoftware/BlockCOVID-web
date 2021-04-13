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

export const loginInfo = ( {username, password }) => {
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
        dispatch(loginInfoSuccess(res.data));
        
      })
      .catch(err => {
        dispatch(loginInfoFailure(err.message));
      });
  };
};

const loginInfoSuccess = todo => ({
  type: ADD_TODO_SUCCESS,
  payload: {
    ...todo
  }
});

/* const addTodoStarted = () => ({
  type: ADD_TODO_STARTED
}); */

const loginInfoFailure = error => ({
  type: ADD_TODO_FAILURE,
  payload: {
    error
  }
});

const ADD_TODO_SUCCESS = "SUCCESS"
const ADD_TODO_FAILURE = "FAILURE"
const ADD_TODO_STARTED = "STARTED"
const DELETE_TODO = "DELETE"
