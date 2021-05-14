import axios, { AxiosResponse } from 'axios';
import accountApi from '../../Api/accountAPI';

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
        mockedAxios.post.mockImplementationOnce(() => Promise.resolve(axiosResponse));
        expect(accountApi.login('user', 'password')).resolves.toEqual(axiosResponse);
    })
});