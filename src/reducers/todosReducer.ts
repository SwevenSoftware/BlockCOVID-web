const ADD_TODO_SUCCESS = "SUCCESS"
const ADD_TODO_FAILURE = "FAILURE"
const ADD_TODO_STARTED = "STARTED"
const DELETE_TODO = "DELETE"
 
 const initialState = {
   loading: false,
   todos: [],
   error: null
 };
 
 export default function todosReducer(state = initialState, action) {
   switch (action.type) {
     case ADD_TODO_STARTED:
       return {
         ...state,
         loading: true
       };
     case ADD_TODO_SUCCESS:
       return {
         ...state,
         loading: false,
         error: null,
         todos: [...state.todos, action.payload]
       };
     case ADD_TODO_FAILURE:
       return {
         ...state,
         loading: false,
         error: action.payload.error
       };
     default:
       return state;
   }
 }