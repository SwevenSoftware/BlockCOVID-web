const loggedReducer = (state = false, action) => {
   switch(action.type) {
      case 'SING_IN':
         return state = true;
      case 'SING_OUT':
         return state = false;
      default:
         return state =false;
   }
}

export default loggedReducer;