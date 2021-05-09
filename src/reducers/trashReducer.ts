import { reducerFactory } from "./reducerFactory";
import trashHandlers from "./handlers/trashHandlers";

const initialState = {
    error: null
}

export default reducerFactory(initialState, trashHandlers);
