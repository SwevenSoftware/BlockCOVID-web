import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect'
import React from 'react';
import * as actions from '../actions/loginActions'
import * as types from '../types'
import configureStore from "../configureStore";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('dispatches a login action', () => {
        fetchMock.getOnce('/api/account/login', {
            body: {admin: 'admin', password: 'password'} ,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.loginTypes.LOGIN_SUCCESS, payload: '1' }
        ]
        const store = mockStore({token:null,error:''})

        return store.dispatch(actions.login({username: 'admin',password:'password'})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})

