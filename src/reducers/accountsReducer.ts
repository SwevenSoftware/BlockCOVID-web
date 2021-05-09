import { reducerFactory } from "./reducerFactory";
import { accountHandlers } from "./handlers/accountHandlers";

const initialState = {
    users: null,
    error: null
}

export default reducerFactory(initialState, accountHandlers);
