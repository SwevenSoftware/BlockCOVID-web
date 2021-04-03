const loginReducer = (state = initialState, action) => {
   switch(action.type) {
      case 'SIGN_IN':
        return {
           ...state,
           isLogged: true,
        }
      case 'SIGN_OUT':
         return {
            ...state,
            isLogged: false,
         }
      default:
         return state;
   }
}

export default loginReducer;

const initialState = {
      isLogged: false,
      isUsernameValid: false
}
