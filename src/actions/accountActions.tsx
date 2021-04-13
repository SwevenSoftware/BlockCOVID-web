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

export const deleteAccount = () => {
   return {
      type: 'OPEN_DELETE_MODAL'
   }
}

export const deleteAccountConfirm = (username: string, password: string, auth: string) => {
   return {
      type: 'CONFIRM_DELETE_ACCOUNT',
      payload: {
         username: username,
         password: password,
         auth: auth
      }
   }
}

export const closeDeleteAccount = () => {
   return {
      type: 'CLOSE_DELETE_MODAL'
   }
}

export const openNewAccount = () => {
   return {
      type: 'OPEN_NEW_ACCOUNT'
   }
}