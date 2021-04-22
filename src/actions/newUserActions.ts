import {

} from "../types"

import {createAccount} from "../api"

export const newUserConfirm = ({tokenID, username, password, auth}) => {
   return (dispatch, getState) => {
      createAccount(tokenID, username, password, auth)
         .then((res) => {
            dispatch()
         })
   }
}