import loginReducer from '../../src/reducers/loginReducer'
import { ERROR_UNKNOWN, ERROR_USER_NO_AUTH, ERROR_USER_OR_PASS, loginTypes } from '../../src/types';
import { JSDOM } from 'jsdom'

describe('login reducer', function() {
    const initialState = {
        token: null,
        error: ""
    }
    const fakeUser = {
        token: 'userToken',
        authorities: [
            "USER"
        ]
    }

    const fakeAdmin = {
        token: 'adminToken',
        authorities: [
            "ADMIN"
        ]
    }

    it('should have correct initial state', function() {
        const state = {
            token: null,
            error: ""
        }
        const action = {
            type: null
        }
        expect(loginReducer(state, action)).toEqual(state)
    });

    it('should not let non admins login', function() {
        const state = {
            token: null,
            error: ERROR_USER_NO_AUTH
        }
        const action = {
            type: loginTypes.LOGIN_SUCCESS,
            payload: fakeUser
        }
        expect(loginReducer(initialState, action)).toEqual(state)
    });

    it('should return correct login error', function() {
        let state = {
            token: null,
            error: ERROR_USER_OR_PASS
        }
        let action = {
            type: loginTypes.LOGIN_FAILURE,
            payload: {
                error: 400
            }
        }
        expect(loginReducer(initialState, action)).toEqual(state)
        action.payload.error = 500
        expect(loginReducer(initialState, action)).toEqual(state)
        action.payload.error = 300
        state.error = ERROR_UNKNOWN
        expect(loginReducer(initialState, action)).toEqual(state)
    });
});
