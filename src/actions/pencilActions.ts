import { pencilTypes } from "../types"

import { modifyAccount } from '../api'
import { getAccounts } from './accountsActions'

export const pencilConfirm = ({tokenID, link, username, password, auth}) => {
   return(dispatch, getState) => {
      modifyAccount(tokenID, link, username, password, auth)
         .then((res) => {
            dispatch(successMessage(res.data))
            dispatch(getAccounts(tokenID))
         })
         .catch (err => {
            dispatch(failureMessage(err))
         })
   }
}

const successMessage = (data) => ({
   type: pencilTypes.PENCIL_SUCCESS,
   payload: {
      ...data
   }
})

const failureMessage = (error) => ({
   type: pencilTypes.PENCIL_FAILURE,
   payload: {
      error
   }
})