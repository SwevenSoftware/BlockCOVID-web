import { login } from "../api"
import axios from 'axios';


const loginReducer = (state = initialState, action) => {
   switch(action.type) {
      case 'SIGN_IN':
        return {
           ...state,
           isLogged: true,
        }
      break;
      case 'SIGN_IN_UP':
        let update = initialState;
        login(action.payload.username, action.payload.password).then((res) => { /* user exists */
            let isAdmin = res.data.authorities.includes("ADMIN");
            console.log(isAdmin)
            if(isAdmin) { /* user has admin authorities, authorized login attempt */
              update = {
                ...update,
                isLogged: true,
                errorMessage: "sei entrato!"
              }
              console.log(isAdmin)
              console.log("success")
            }
            else {  /* unauthorized login attempt */
              update = {
                ...update,
                isLogged: false,
                errorMessage: "Accesso non autorizzato. Si prega di contattare l'amministratore"
              }
              console.log("no auth")
            }
          }).catch((err) => { /* user not logged in, user may not exists */
            switch(err.response?.status) {
              case 400: case 500:
                /* 400: incorrect password
                   500: incorrect username or user does not exists */
               update = {
                 ...update,
                 isLogged: false,
                 errorMessage: "Username o password scorretta. Riprova"
               }
               //console.log(update.errorMessage)
               console.log("bruh")
              break;
            }
          })
        return {
           ...state,
           ...update
        }
      break;
      case 'SIGN_OUT':
         return initialState;
      break;
      default: return state;
   }
}

export default loginReducer;

export const initialState = {
      isLogged: false,
      errorMessage: ""
}
