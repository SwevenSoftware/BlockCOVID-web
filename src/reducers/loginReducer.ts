const loginReducer = (state = initialState, action) => {
   switch(action.type) {
      case 'SIGN_IN':
        return { // TODO: check if username and password are valid
           ...state,
           isLogged: true,
        }
      break;
      case 'SIGN_OUT':
         return initialState;
      break;
      case 'USERNAME_TYPING':
        return state; // TODO: check if username is valid
      break;
      case 'PASSWORD_TYPING':
        return state; // TODO: check if password is valid
      break;
      default: return state;
   }
}

export default loginReducer;

export const initialState = {
      isLogged: false,
      isUsernameValid: false,
      isPasswordValid: false
}
