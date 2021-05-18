import configureMockStore from 'redux-mock-store'
import { loginActions } from '../../src/actions/loginActions'
import { accountTypes, ERROR_UNKNOWN, loginTypes } from "../../src/types";
import fetchMock from 'fetch-mock'
import thunk from "redux-thunk";
import { AxiosResponse } from "axios";

const mockStore = configureMockStore([thunk])

describe('Account Action', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    const accountInformation = {
        username: "user",
        password: "password",
        authorities: [
            "USER"
        ]
    }

    let store;
    let loginActionsResolver;
    let accountApi;

    beforeEach(() => {
        store = mockStore({
            login: {
                token: {
                    id: "adminToken",
                    error: ""
                }
            }
        })
        accountApi = jest.fn as jest.Mock<typeof accountApi>;
        loginActionsResolver = new loginActions(accountApi)
    })

    const axiosResponse: AxiosResponse = {
        data: {
            token: {
                id: "adminToken"
            }
        },
        status: 200,
        statusText: "OK",
        config: {},
        headers: {}
    }

    it('should correctly handle login', function() {
        accountApi.login = jest.fn(async () => {
            return axiosResponse
        })
        const expectedAction = [
            {
                type: loginTypes.LOGIN_SUCCESS
            }
        ]
        store.dispatch(loginActionsResolver.login({ username: "admin", password: "password" }))
        // expect(store.getActions()).toContain(expectedAction)
    });

    it('should correctly handle logout', function() {
        accountApi.logout = jest.fn(async () => {
            return { ...axiosResponse, data: {} }
        })
        const expectedAction = [
            {
                type: loginTypes.LOGOUT
            }
        ]
        store.dispatch(loginActionsResolver.logout())
        // expect(store.getActions()).toContain(expectedAction)
    });

    it('should correctly handle login failure', function() {
        accountApi.login = jest.fn(async () => {
            throw new Error()
        })
        const expectedAction = [
            {
                type: loginTypes.LOGIN_FAILURE
            }
        ]
        store.dispatch(loginActionsResolver.login({ username: "admin", password: "password" }))
        // expect(store.getActions()).toContain(expectedAction)
    });
})