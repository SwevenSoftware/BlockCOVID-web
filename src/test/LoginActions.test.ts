import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from '../actions/loginActions'
import * as types from '../types'
import fetchMock from 'fetch-mock'
import expect from 'expect'


import React from 'react';


it('It should render without errors', () => {

})


/*
 const middlewares = [thunk]
 const mockStore = configureMockStore(middlewares)
 describe ('async actions', () => {
   afterEach(() =>  {
      fetchMock.restore()
   })

   it ('creates LOGIN_SUCCESS when someone has insert the right credentials', () => {
      fetchMock.getOnce('/login', {
         body: {token: ['number']},
         headers: {'content-type': 'application/json'}
      })

      const expectedApplications = [
         { type: types.LOGIN_SUCCESS },
         { type: types.LOGIN_FAILURE, body: { token: ['number'] } }
      ]

      const store = mockStore({ token: [] })

      return store.dispatch(actions.login({username: 'admin', password: 'password'})).then(() => {
         expect(store.getActions()).toEqual(expectedApplications)
      })
   })
}) */

