import axios, { AxiosResponse } from 'axios';
import roomApi from '../../src/Api/roomAPI';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('roomApi', () => {

    const axiosResponse: AxiosResponse = {
        data: {},
        status: 200,
        statusText: "OK",
        config: {},
        headers: {}
    }

    const adminToken = "adminToken"

    const requestConfig = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": adminToken
        }
    }

    it('correct create room', () => {
        const data = {
            name: "",
            openingAt: "",
            closingAt: "",
            openingDays: [],
            width: 1,
            height: 1
        }
        mockedAxios.post.mockImplementationOnce(() => Promise.resolve(axiosResponse));
        expect(roomApi.createRoom(adminToken, data)).resolves.toEqual(axiosResponse);
        expect(mockedAxios.post).lastCalledWith(
            "/api/rooms",
            data,
            requestConfig
        );
    });

    it('correct modify room', () => {
        const data = {
            roomName: "",
            name: "",
            openingAt: "",
            closingAt: "",
            openingDays: [],
            width: 1,
            height: 1
        }

        mockedAxios.put.mockImplementationOnce(() => Promise.resolve(axiosResponse));
        expect(roomApi.modifyRoom(adminToken, "/api/rooms/", data)).resolves.toEqual(axiosResponse);
        expect(mockedAxios.put).lastCalledWith(
            "/api/rooms/" + data.roomName,
            data,
            requestConfig
        );
    });

    it('correct delete room', () => {
        const data = {
            roomName: "room"
        }
        mockedAxios.delete.mockImplementationOnce(() => Promise.resolve(axiosResponse));
        expect(roomApi.deleteRoom('adminToken', "/api/rooms/", data)).resolves.toEqual(axiosResponse);
        expect(mockedAxios.delete).lastCalledWith(
            "/api/rooms/" + data.roomName,
            requestConfig
        );
    });

    it('correct getRooms', () => {

        mockedAxios.get.mockImplementationOnce(() => Promise.resolve(axiosResponse));
        expect(roomApi.getRooms(adminToken, { fromTimestamp: "", toTimestamp: "" })).resolves.toEqual(axiosResponse);
        expect(mockedAxios.get).lastCalledWith(
            "/api/rooms",
            requestConfig
        );
    });
});