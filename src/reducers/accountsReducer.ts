import { reducerFactory } from "./reducerFactory"
import { accountHandlers } from "./handlers/accountHandlers"

const initialState = {
    users: null,
    error: null,
    counter: {
        accounts: 0,
        admins: 0,
        users: 0,
        cleaners: 0
    }
}

export default reducerFactory(initialState, accountHandlers)

