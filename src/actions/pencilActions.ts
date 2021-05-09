import {
   PENCIL_SUCCESS,
   PENCIL_FAILURE,
   NEW_USER_SUCCESS
} from "../types"

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
   type: PENCIL_SUCCESS,
   payload: {
      ...data
   }
})

const failureMessage = (error) => ({
   type: PENCIL_FAILURE,
   payload: {
      error
   }
})