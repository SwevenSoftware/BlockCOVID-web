import { pencilTypes } from '../types'

const initialState = {
    error: null,
}

export default function pencilReducer(state = initialState, action) {
    switch (action.type) {
        case pencilTypes.PENCIL_SUCCESS:
            return {
                error: null
            }
            break;
        case pencilTypes.PENCIL_FAILURE:
            return state
            break;
        default:
            return state
    }
}