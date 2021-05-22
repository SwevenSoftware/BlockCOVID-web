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

    createRoom(tokenID: string, data: RoomInformation) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID
            }
        }
        return this.axios.post("/api/rooms", data, config)
    }

    modifyRoom(tokenID: string,
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
        return this.axios.put("/api/rooms/" + data.roomName, data, config)
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

    createDesks(tokenID: string,
        data: {
            roomName: string,
            desks: {
                x: number,
                y: number
            }[]
        }
    ) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID
            }
        }
        return this.axios.post("/api/rooms/" + data.roomName + "/desks", data.desks, config)
    }

    modifyDesk(tokenID: string,
        data: {
            roomName: string,
            desk: {
                oldInfo: DeskInformation,
                newInfo: DeskInformation
            }
        }
    ) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID
            },
        }
        return this.axios.put("/api/rooms/" + data.roomName + "/desks", { oldInfo: { ...data.desk.oldInfo }, newInfo: { ...data.desk.newInfo } }, config)
    }

    deleteDesk(tokenID: string,
        data: {
            roomName: string,
            desksId: Array<string>
        }
    ) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID
            },
            data: data.desksId
        }
        return this.axios.delete("/api/rooms/desks", config)
    }
}

export default new roomAPI(axios)