import axios from 'axios'

export const login = () => {
   return {
     type: 'SIGN_IN',
    }
}

export const loginUP = (username: string, password: string) => {
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

export const addTodo = ({ title, userId }) => {
  return (dispatch, getState) => {
    dispatch(addTodoStarted());

    console.log('current state:', getState());

    axios
      .post(`https://jsonplaceholder.typicode.com/todos`, {
        title,
        userId,
        completed: false
      })
      .then(res => {
        setTimeout(() => {
          dispatch(addTodoSuccess(res.data));
        }, 2500);
      })
      .catch(err => {
        dispatch(addTodoFailure(err.message));
      });
  };
};

const addTodoSuccess = todo => ({
  type: ADD_TODO_SUCCESS,
  payload: {
    ...todo
  }
});

const addTodoStarted = () => ({
  type: ADD_TODO_STARTED
});

const addTodoFailure = error => ({
  type: ADD_TODO_FAILURE,
  payload: {
    error
  }
});

const ADD_TODO_SUCCESS = "SUCCESS"
const ADD_TODO_FAILURE = "FAILURE"
const ADD_TODO_STARTED = "STARTED"
const DELETE_TODO = "DELETE"

