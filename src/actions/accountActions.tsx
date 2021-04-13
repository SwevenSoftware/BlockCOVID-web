import axios from 'axios'

export const addAccount = () => {
   return {
      type: 'OPEN_PENCIL'
   }
}

export const confirmAddAccount = (username: string, password: string, confirmPassword: string, auth: string) => {
   return {
      type: 'CONFIRM_PENCIL',
      payload: {
         username: username,
         password: password,
         confirmPassword: confirmPassword,
         auth: auth,
      }
   }
}

export const closeAddAccount = () => {
   return {
      type: 'CLOSE_PENCIL'
   }
}

