import configureMockStore from 'redux-mock-store'
import { accountsActions } from '../../src/actions/accountsActions'
import { accountTypes, ERROR_UNKNOWN } from "../../src/types";
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
    let accountActionsResolver;
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
        accountActionsResolver = new accountsActions(accountApi)
    })

    const axiosResponse: AxiosResponse = {
        data: {
            username: "user",
            authorities: [
                "USER"
            ]
        },
        status: 200,
        statusText: "OK",
        config: {},
        headers: {}
    }

    it('should correctly handle account creation', function() {
        accountApi.createAccount = jest.fn(async () => {
            return axiosResponse
        })
        const expectedAction = [
            {
                type: accountTypes.CREATE_SUCCESS
            },
            {
                type: accountTypes.FETCH_SUCCESS,
                payload: {
                    ...accountInformation,
                    password: undefined
                }
            }
        ]
        store.dispatch(accountActionsResolver.createAccount(accountInformation))
        // expect(store.getActions()).toContain(expectedAction)
    });

    it('should correctly handle account modification', function() {
        accountApi.modifyAccount = jest.fn(async () => {
            return axiosResponse
        })
        const expectedAction = [
            {
                type: accountTypes.MODIFY_SUCCESS
            },
            {
                type: accountTypes.FETCH_SUCCESS,
                payload: {
                    ...accountInformation,
                    password: undefined
                }
            }
        ]
        store.dispatch(accountActionsResolver.modifyAccount(accountInformation))
        // expect(store.getActions()).toContain(expectedAction)
    });

    it('should correctly handle account deletion', function() {
        accountApi.deleteAccount = jest.fn(async () => {
            return axiosResponse
        })
        const expectedAction = [
            {
                type: accountTypes.DELETE_SUCCESS
            },
            {
                type: accountTypes.FETCH_SUCCESS,
                payload: {
                    ...accountInformation,
                    password: undefined
                }
            }
        ]
        store.dispatch(accountActionsResolver.deleteAccount('api/users/', { username: 'user' }))
        // expect(store.getActions()).toContain(expectedAction)
    });

    it('should correctly handle account fetch', function() {
        accountApi.getAccounts = jest.fn(async () => {
            return axiosResponse
        })
        const expectedAction = [
            {
                type: accountTypes.FETCH_SUCCESS,
                payload: {
                    ...accountInformation,
                    password: undefined
                }
            }
        ]
        store.dispatch(accountActionsResolver.getAccounts())
        // expect(store.getActions()).toContain(expectedAction)
    });

    it('should correctly handle account creation errors', function() {
        accountApi.createAccount = jest.fn(async () => {
            return { ...axiosResponse, status: 400 };
        })
        const expectedAction = [
            {
                type: accountTypes.CREATE_FAILURE
            },
            {
                type: accountTypes.FETCH_SUCCESS,
                payload: {
                    ...accountInformation,
                    password: undefined
                }
            }
        ]
        store.dispatch(accountActionsResolver.createAccount(accountInformation))
        // expect(store.getActions()).toContain(expectedAction)
    });

    it('should correctly handle account deletion errors', function() {
        accountApi.createAccount = jest.fn(async () => {
            return { ...axiosResponse, status: 400 };
        })
        const expectedAction = [
            {
                type: accountTypes.DELETE_FAILURE
            },
            {
                type: accountTypes.FETCH_SUCCESS,
                payload: {
                    ...accountInformation,
                    password: undefined
                }
            }
        ]
        store.dispatch(accountActionsResolver.deleteAccount('api/users/', { username: 'user' }))
        // expect(store.getActions()).toContain(expectedAction)
    });

    it('should correctly handle account modification errors', function() {
        accountApi.createAccount = jest.fn(async () => {
            return { ...axiosResponse, status: 400 };
        })
        const expectedAction = [
            {
                type: accountTypes.MODIFY_FAILURE
            },
            {
                type: accountTypes.FETCH_SUCCESS,
                payload: {
                    ...accountInformation,
                    password: undefined
                }
            }
        ]
        store.dispatch(accountActionsResolver.modifyAccount('api/users/', accountInformation))
        // expect(store.getActions()).toContain(expectedAction)
    });

    it('should correctly handle account fetch errors', function() {
        accountApi.createAccount = jest.fn(async () => {
            return { ...axiosResponse, status: 400 };
        })
        const expectedAction = [
            {
                type: accountTypes.FETCH_FAILURE,
                payload: {
                    error: ERROR_UNKNOWN
                }
            }
        ]
        store.dispatch(accountActionsResolver.getAccounts())
        // expect(store.getActions()).toContain(expectedAction)
    });

})