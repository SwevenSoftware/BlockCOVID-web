import roomReducer from '../../src/reducers/roomsReducer'
import { roomTypes, ERROR_UNKNOWN, ERROR_USERNAME_NOT_AVAILABLE } from '../../src/types';
import { JSDOM } from 'jsdom'

describe('accuonts reducer test', function() {
    const initialState = {
        rooms: null,
        error: null
    }

    const fakeRooms = {
        _embedded: {
            roomWithDesksList: [
                {
                    name: 'room1'
                },
                {
                    name: 'room2'
                }
            ]
        }
    }

    it('should have correct initial state', function() {
        const action = {
            type: null
        }
        expect(roomReducer(initialState, action)).toEqual(initialState)
    });

    it('should fetch correctly', function() {

        const action = {
            type: roomTypes.FETCH_SUCCESS,
            payload: fakeRooms
        }

        const state = {
            rooms: fakeRooms._embedded.roomWithDesksList,
            error: ""
        }
        expect(roomReducer(initialState, action)).toEqual(state)

    });

    it('should correctly handle fetch error', function() {
        const otherPayload = {
            ...fakeRooms._embedded.roomWithDesksList,
            error: 400
        }

        const action = {
            type: roomTypes.FETCH_FAILURE,
            payload: otherPayload
        }

        const state = {
            rooms: null,
            error: ERROR_UNKNOWN
        }
        expect(roomReducer(initialState, action)).toEqual(state)

    });

    it('should correctly handle fetch error', function() {

        const action = {
            type: roomTypes.FETCH_FAILURE,
            payload: fakeRooms
        }
        expect(roomReducer(initialState, action)).toEqual(initialState)

    });

    it('should correcly handle user fetch error with no proper message', function() {
        const action = {
            type: roomTypes.FETCH_SUCCESS,
            payload: fakeRooms
        }

        const state = {
            error: "",
            rooms: fakeRooms._embedded.roomWithDesksList
        }

        expect(roomReducer(initialState, action)).toEqual(state)
    });

    it('should correcly handle deletion error', function() {
        const otherPayload = {
            ...fakeRooms,
            error: 409
        }

        const action = {
            type: roomTypes.DELETE_FAILURE,
            payload: otherPayload
        }

        const state = {
            ...initialState,
            error: ERROR_UNKNOWN
        }
        expect(roomReducer(initialState, action)).toEqual(state)
    });

    it('should correcly handle unknown creation error', function() {
        const action = {
            type: roomTypes.DELETE_FAILURE,
            payload: fakeRooms
        }

        const state = initialState
        expect(roomReducer(initialState, action)).toEqual(state)
    });

    it('should modify correctly', function() {
        const action = {
            type: roomTypes.MODIFY_SUCCESS,
            payload: fakeRooms
        }

        const state = {
            ...initialState,
            error: ""
        }
        expect(roomReducer(initialState, action)).toEqual(state)
    });

    it('should delete correctly', function() {

        const action = {
            type: roomTypes.DELETE_SUCCESS,
            payload: fakeRooms
        }

        const state = initialState
        expect(roomReducer(initialState, action)).toEqual(state)
    });

    it('should delete correctly even if errors', function() {
        const otherPayload = {
            ...fakeRooms,
            error: 400
        }

        const action = {
            type: roomTypes.DELETE_SUCCESS,
            payload: otherPayload
        }

        const state = {
            ...initialState,
            error: ""
        }
        expect(roomReducer(initialState, action)).toEqual(state)
    });

    it('should correcly handle deletion error', function() {
        const otherPayload = {
            ...fakeRooms,
            error: 400
        }

        const action = {
            type: roomTypes.DELETE_FAILURE,
            payload: otherPayload
        }

        const state = {
            ...initialState,
            error: ERROR_UNKNOWN
        }
        expect(roomReducer(initialState, action)).toEqual(state)
    });

    it('should correcly handle modify error', function() {
        const otherPayload = {
            ...fakeRooms,
            error: 400
        }

        const action = {
            type: roomTypes.MODIFY_FAILURE,
            payload: otherPayload
        }

        const state = {
            ...initialState,
            error: ERROR_UNKNOWN
        }
        expect(roomReducer(initialState, action)).toEqual(state)
    });

    it('should correcly handle modify error even if no proper code', function() {

        const action = {
            type: roomTypes.MODIFY_FAILURE,
            payload: fakeRooms
        }

        expect(roomReducer(initialState, action)).toEqual(initialState)
    });

    it('should correcly handle creation error', function() {
        const otherPayload = {
            ...fakeRooms,
            error: 400
        }

        const action = {
            type: roomTypes.CREATE_FAILURE,
            payload: otherPayload
        }

        const state = {
            ...initialState,
            error: ERROR_UNKNOWN
        }
        expect(roomReducer(initialState, action)).toEqual(state)
    });

    it('should correcly handle creation success', function() {

        const action = {
            type: roomTypes.CREATE_SUCCESS,
            payload: fakeRooms
        }

        const state = {
            ...initialState,
            error: ""
        }
        expect(roomReducer(initialState, action)).toEqual(state)
    });
});