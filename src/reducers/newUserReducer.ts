import { reducerFactory } from "./reducerFactory";
import newUserHandlers from "./handlers/newUserHandlers";

const initialState = {
    error: null,
}

export default reducerFactory(initialState, newUserHandlers);