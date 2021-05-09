import {
    trashTypes
} from "../types"
import { deleteAccount as deleteAccountAPI } from '../api';

export const deleteAccount = (username: string, link: string, tokenID: string) => {
    return (dispatch, getState) => {
        deleteAccountAPI(username, link, tokenID)
            .then((res) => {
                dispatch(successAccount(res.data))
            })
            .catch(err => {
                dispatch(failure(err))
            })
    }
}

const successAccount = (data) => ({
    type: trashTypes.TRASH_ACCOUNTS_SUCCESS,
    payload: {
        ...data
    }
})

const failure = (error) => ({
    type: trashTypes.TRASH_FAILURE,
    payload: {
        error
    }
})
