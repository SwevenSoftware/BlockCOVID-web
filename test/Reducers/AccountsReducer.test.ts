import accountsreducer from '../../src/reducers/accountsReducer'
import { accountTypes, ERROR_UNKNOWN, ERROR_USERNAME_NOT_AVAILABLE } from '../../src/types';

describe('accuonts reducer test', function() {
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

    let fakePayload = {
        _embedded: {
            userList: [
                fakeAdmin,
                fakeUser
            ]
        }
    }

    it('should have correct initial state', function() {
        const action = {
            type: null
        }
        expect(accountsreducer(initialState, action)).toEqual(initialState)
    });

    it('should count right amount of uerss', function() {

        const action = {
            type: accountTypes.FETCH_SUCCESS,
            payload: fakePayload
        }

        const state = {
            users: fakePayload._embedded.userList,
            error: '',
            counter: {
                accounts: 2,
                admins: 1,
                users: 1,
                cleaners: 0
            }
        }
        expect(accountsreducer(initialState, action)).toEqual(state)

    });

    it('should correctly handle fetch error', function() {
        const otherPayload = {
            ...fakePayload,
            error: 400
        }

        const action = {
            type: accountTypes.FETCH_FAILURE,
            payload: otherPayload
        }

        const state = {
            users: null,
            error: ERROR_UNKNOWN,
            counter: null
        }
        expect(accountsreducer(initialState, action)).toEqual(state)

    });

    it('should correctly handle fetch error even if no proper errors', function() {

        const action = {
            type: accountTypes.FETCH_FAILURE,
            payload: fakePayload
        }

        expect(accountsreducer(initialState, action)).toEqual(initialState)

    });

    it('should correctly handle modify error', function() {
        const otherPayload = {
            ...fakePayload,
            error: 400
        }

        const action = {
            type: accountTypes.MODIFY_FAILURE,
            payload: otherPayload
        }

        const state = {
            ...initialState,
            error: ERROR_UNKNOWN
        }
        expect(accountsreducer(initialState, action)).toEqual(state)

    });

    it('should correctly handle creation error even if no proper errors', function() {

        const action = {
            type: accountTypes.CREATE_FAILURE,
            payload: fakePayload
        }

        expect(accountsreducer(initialState, action)).toEqual({
            ...initialState,
            error: ERROR_UNKNOWN
        })

    });

    it('should correctly handle creation error', function() {
        const otherPayload = {
            ...fakePayload,
            error: 409
        }

        const action = {
            type: accountTypes.CREATE_FAILURE,
            payload: otherPayload
        }

        const state = {
            ...initialState,
            error: ERROR_USERNAME_NOT_AVAILABLE
        }
        expect(accountsreducer(initialState, action)).toEqual(state)

    });

    it('should correctly handle modify error even if no proper errors', function() {

        const action = {
            type: accountTypes.MODIFY_FAILURE,
            payload: fakePayload
        }

        expect(accountsreducer(initialState, action)).toEqual(initialState)

    });

    it('should correcly handle user fetch', function() {
        const action = {
            type: accountTypes.FETCH_SUCCESS,
            payload: fakePayload
        }

        const state = {
            users: fakePayload._embedded.userList,
            error: '',
            counter: {
                accounts: 2,
                admins: 1,
                users: 1,
                cleaners: 0
            }
        }
        expect(accountsreducer(initialState, action)).toEqual(state)
    });

    it('should correcly handle deletion error', function() {
        const otherPayload = {
            ...fakePayload,
            error: 409
        }

        const action = {
            type: accountTypes.DELETE_FAILURE,
            payload: otherPayload
        }

        const state = {
            ...initialState,
            error: ERROR_UNKNOWN
        }
        expect(accountsreducer(initialState, action)).toEqual(state)
    });

    it('should correcly handle unknown deletion error', function() {

        const action = {
            type: accountTypes.DELETE_FAILURE,
            payload: fakePayload
        }
        expect(accountsreducer(initialState, action)).toEqual(initialState)
    });

    it('should modify a user', function() {
        const action = {
            type: accountTypes.MODIFY_SUCCESS,
            payload: fakePayload
        }

        const state = {
            ...initialState,
            error: ""
        }
        expect(accountsreducer(initialState, action)).toEqual(state)
    });

    it('should delete correctly', function() {

        const action = {
            type: accountTypes.DELETE_SUCCESS,
            payload: fakePayload
        }

        const state = initialState
        expect(accountsreducer(initialState, action)).toEqual(state)
    });

    it('should delete correctly even if errors', function() {
        const otherPayload = {
            ...fakePayload,
            error: 400
        }

        const action = {
            type: accountTypes.DELETE_SUCCESS,
            payload: otherPayload
        }

        const state = {
            ...initialState,
            error: ""
        }
        expect(accountsreducer(initialState, action)).toEqual(state)
    });

    it('should correcly handle deletion error', function() {
        const otherPayload = {
            ...fakePayload,
            error: 400
        }

        const action = {
            type: accountTypes.DELETE_FAILURE,
            payload: otherPayload
        }

        const state = {
            ...initialState,
            error: ERROR_UNKNOWN
        }
        expect(accountsreducer(initialState, action)).toEqual(state)
    });

    it('should correctly create a new user', function() {

        const action = {
            type: accountTypes.CREATE_SUCCESS,
            payload: fakePayload
        }

        const state = {
            ...initialState,
            error: ""
        }

        expect(accountsreducer(initialState, action)).toEqual(state)
    });
});