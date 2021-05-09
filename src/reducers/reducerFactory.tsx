export function reducerFactory(initialState, handlers) {
    return function(state = initialState, action) {
        const handler = handlers[action.type]
        if (handler) {
            return handler(state, action)
        }
        return state
    }
}