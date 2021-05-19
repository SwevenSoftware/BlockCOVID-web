import axios, { AxiosStatic } from "axios"

export interface RoomInformation {
  name: string,
  openingAt: string,
  closingAt: string,
  openingDays: string[],
  width: number,
  height: number
}

export interface DeskInformation {
  id: string,
  x: number,
  y: number
}

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
            name: string
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
                "Authorization": tokenID
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
            },
            params: {
                from: data.fromTimestamp,
                to: data.toTimestamp
            }
        }

        const url = '/api/rooms'
        return this.axios.get(url, config)
    }

    createDesk(tokenID: string,
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
        return this.axios.get(data.name, config)
    }

    modifyDesk(tokenID: string,
        data: {
            roomName: string,
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
        return this.axios.put(data.roomName, data, config)
    }

    deleteDesk(tokenID: string,
        data: {
            roomName: string,
            width: number,
            height: number
        }
    ) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID
            },
        }
        return this.axios.delete(data.roomName, config)
    }
}

export default new roomAPI(axios)