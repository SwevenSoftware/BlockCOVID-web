import axios, { AxiosStatic } from "axios"

export class roomAPI {
    private axios: AxiosStatic

    constructor(axios: AxiosStatic) {
        this.axios = axios
    }

    createRoom(tokenID: string,
        data: {
            name: string,
            openingAt: string,
            closingAt: string,
            openingDays: string[],
            width: number,
            height: number
        }
    ) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID
            }
        }
        return this.axios.post("/api/rooms", data, config)
    }

    modifyRoom(tokenID: string, url: string,
        data: {
            roomName: string,
            name: string,
            openingAt: string,
            closingAt: string,
            openingDays: string[],
            width: number,
            height: number
        }
    ) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID,
            }
        }
        return this.axios.put(url + data.roomName, data, config)
    }

    deleteRoom(tokenID: string, url: string,
        data: {
            roomName: string
        }
    ) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID,
                "roomName": data.roomName
            }
        }
        return this.axios.delete(url + data.roomName, config)
    }

    getRooms(tokenID: string,
        data: {
            fromTimestamp: string,
            toTimestamp: string
        }
    ) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID,
            }
        }
        const url = '/api/rooms' +
            (data.fromTimestamp && data.toTimestamp ? '?from=' + data.fromTimestamp + "&to=" + data.toTimestamp : '')
        return this.axios.get(url, config)
    }
}

export default new roomAPI(axios)