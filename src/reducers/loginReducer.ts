import { reducerFactory } from "./reducerFactory"
import loginHandlers from "./handlers/loginHandlers"

interface loginState {
    token: any,
    error: string
}

const initialState: loginState = {
    token: null,
    error: ""
}

export default reducerFactory(initialState, loginHandlers)