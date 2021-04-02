export const login = () => {
   return {
      type: 'SIGNING_IN'
   }
}

export const logout = () => {
   return {
      type: 'SIGNING_OUT'
   }
}

export const usernameTyping = () => {
   return {
      type: 'USERNAME_TYPING'
   }
}