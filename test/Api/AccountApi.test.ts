import axios, { AxiosResponse } from 'axios';
import accountApi from '../../src/Api/accountAPI';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('accountApi', () => {
    it('correct login', () => {
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

        const requestConfig = {
            headers: { "Content-Type": "application/json" }
        }

        mockedAxios.post.mockImplementationOnce(() => Promise.resolve(axiosResponse));
        expect(accountApi.login({ username: 'user', password: 'password' })).resolves.toEqual(axiosResponse);
        expect(mockedAxios.post).lastCalledWith(
            "/api/account/login",
            { username: 'user', password: 'password' },
            requestConfig
        );
    });

    it('correct logout', () => {
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

        const config = {
            headers: {
                "Authorization": 'userToken',
                'Content-Type': 'application/json'
            }
        }

        mockedAxios.delete.mockImplementationOnce(() => Promise.resolve(axiosResponse));
        expect(accountApi.logout('userToken')).resolves.toEqual(axiosResponse);
        expect(mockedAxios.delete).lastCalledWith(
            "/api/account/logout",
            config
        );
    });

    it('correct modifyAccount', () => {
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

        const config = {
            headers: {
                "Authorization": 'adminToken',
                'Content-Type': 'application/json'
            }
        }

        mockedAxios.put.mockImplementationOnce(() => Promise.resolve(axiosResponse));
        expect(accountApi.modifyAccount('adminToken', "/api/account", { username: "user", password: "newPassword", authorities: ["USER"] })).resolves.toEqual(axiosResponse);
        expect(mockedAxios.put).lastCalledWith(
            "/api/account",
            { ...axiosResponse.data, password: "newPassword" },
            config
        );
    });

    it('correct createAccount', () => {
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

        const config = {
            headers: {
                "Authorization": 'adminToken',
                'Content-Type': 'application/json'
            }
        }

        mockedAxios.post.mockImplementationOnce(() => Promise.resolve(axiosResponse));
        expect(accountApi.createAccount('adminToken', { username: "user", password: "password", authorities: ["USER"] })).resolves.toEqual(axiosResponse);
        expect(mockedAxios.post).lastCalledWith(
            "/api/users",
            { ...axiosResponse.data, password: "password" },
            config
        );
    });

    it('correct deleteAccount', () => {
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

        const config = {
            headers: {
                "Authorization": 'adminToken',
                'Content-Type': 'application/json'
            }
        }

        mockedAxios.delete.mockImplementationOnce(() => Promise.resolve(axiosResponse));
        expect(accountApi.deleteAccount('adminToken', '/api/account/', { username: 'user' })).resolves.toEqual(axiosResponse);
        expect(mockedAxios.delete).lastCalledWith(
            "/api/account/user",
            config
        );
    });

    it('correct getAccounts', () => {
        const axiosResponse: AxiosResponse = {
            data: [
                {
                    username: "user",
                    authorities: [
                        "USER",
                    ]
                },
                {
                    username: "use1",
                    authorities: [
                        "USER",
                    ]
                },
                {
                    username: "admin",
                    authorities: [
                        "ADMIN",
                    ]
                }
            ],
            status: 200,
            statusText: "OK",
            config: {},
            headers: {}
        }

        const config = {
            headers: {
                "Authorization": 'adminToken',
                'Content-Type': 'application/json'
            }
        }

        mockedAxios.get.mockImplementationOnce(() => Promise.resolve(axiosResponse));
        expect(accountApi.getAccounts('adminToken')).resolves.toEqual(axiosResponse);
        expect(mockedAxios.get).lastCalledWith(
            "/api/users",
            config
        );
    });
});