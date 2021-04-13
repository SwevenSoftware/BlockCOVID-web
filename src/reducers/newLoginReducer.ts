const LOGIN_SUCCESS = "SUCCESS"
const LOGIN_FAILURE = "FAILURE"
const ADD_TODO_STARTED = "STARTED"
const DELETE_TODO = "DELETE"

 const initialState = {
   infoLogin: [],
   error: null
 };

 export default function infoLoginReducer(state = initialState, action) {
   switch (action.type) {
     case LOGIN_SUCCESS:
       console.log("success_login")

       return {
         ...state,
         error: null,
         infoLogin: [...state.infoLogin, action.payload]
       };
     case LOGIN_FAILURE:
       console.log("login_failed")
       return {
         ...state,
         error: action.payload.error
       };
     default:
       return state;
   }
 }
