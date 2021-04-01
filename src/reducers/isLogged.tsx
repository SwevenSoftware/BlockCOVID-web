const loggedReducer = (state = false, action) => {
   switch(action.type) {
      case 'SING_IN':
         return true;
      case 'SING_OUT':
         return false;
      default:
         return false;
   }
}

export default loggedReducer;