const ADD_TODO_SUCCESS = "SUCCESS"
const ADD_TODO_FAILURE = "FAILURE"
const ADD_TODO_STARTED = "STARTED"
const DELETE_TODO = "DELETE"

 const initialState = {
   loading: false,
   infoLogin: [],
   error: null
 };

 export default function infoLoginReducer(state = initialState, action) {
   switch (action.type) {
     case ADD_TODO_SUCCESS:
       console.log("add_todo_success")

       return {
         ...state,
         //loading: false,
         error: null,
         infoLogin: [...state.infoLogin, action.payload]
       };
     case ADD_TODO_FAILURE:
       console.log("add_todo_failure")
       return {
         ...state,
         //loading: false,
         error: action.payload.error
       };
     default:
       return state;
   }
 }
