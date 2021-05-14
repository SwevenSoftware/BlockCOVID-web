import axios, {AxiosStatic} from "axios";

export class roomAPI {
    private axios: AxiosStatic;

    constructor(axios: AxiosStatic) {
        this.axios = axios;
    }
    createRoom (tokenID: string, {name, openingAt, closingAt, openingDays, width, height}) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID
            }
        }
        const data = {
            name: name,
            openingAt: openingAt,
            closingAt: closingAt,
            openingDays: openingDays,
            width: width,
            height: height
        }
        return this.axios.post("/api/rooms", data, config);
    }

    modifyRoom (tokenID: string, roomName: string, link: string, {
        name,
        openingAt,
        closingAt,
        openingDays,
        width,
        height
    }) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID,
                "roomName": roomName
            }
        }
        const data = {
            name: name,
            openingAt: openingAt,
            closingAt: closingAt,
            openingDays: openingDays,
            width: width,
            height: height
        }
        return this.axios.put(link + roomName, data, config);
    }

    deleteRoom (tokenID: string, roomName: string, link: string) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID,
                "roomName": roomName
            }
        }
        return this.axios.delete(link + roomName, config);
    }

    getRooms (tokenID: string, fromTimestamp: string, toTimestamp: string) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID,
            }
        }
        const url = '/api/rooms' + (fromTimestamp && toTimestamp ? '?from=' + fromTimestamp + "&to=" + toTimestamp : '')
        return this.axios.get(url, config);
    }
}

export default new roomAPI(axios);