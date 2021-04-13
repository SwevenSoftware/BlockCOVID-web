
const accountReducer = (state = initialState, action) => {
   switch(action.type) {
      case 'OPEN_PENCIL':
         return  {}
         
      break;
      case 'CONFIRM_PENCIL':
      break;
      case 'CLOSE_PENCIL':
         
      break;
      case 'OPEN_DELETE_MODAL':
      break;
      case 'CONFIRM_DELETE_ACCOUNT':
      break;
      case 'CLOSE_DELETE_MODAL':
      break;
   }
}

export default accountReducer;

export const initialState = {
   isLogged: true,
   displayMessage: ""
}