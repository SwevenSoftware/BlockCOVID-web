export const login = () => {
   return {
     type: 'SIGN_IN',
    }
}

export const loginUP = (username: string, password: string) => {
   return {
     type: 'SIGN_IN_UP',
     payload: {
       username: username,
       password: password
     }
   }
}

export const logout = () => {
   return { type: 'SIGN_OUT' }
}
