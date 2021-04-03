export const login = () => {
   return {
      type: 'SIGN_IN'
   }
}

export const logout = () => {
   return {
      type: 'SIGN_OUT'
   }
}

export const usernameTyping = () => {
   return {
      type: 'USERNAME_TYPING'
   }
}
