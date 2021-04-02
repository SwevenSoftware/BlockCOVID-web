const loggedReducer = (state = initialState, action) => {
   switch(action.type) {
      case 'SIGNING_IN':
        return {
           ...state,
           isLogged: true,
        }
      case 'SIGNING_OUT':
         return {
            ...state,
            isLogged: false,
         }
      default:
         return state;
   }
}

export default loggedReducer;

const initialState = {
      isLogged: false,
      isUsernameValid: false
}