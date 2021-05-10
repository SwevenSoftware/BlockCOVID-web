import axios from 'axios'

/* post */

export const login = ({ username, password }) => {
    const config = {
        headers: { "Content-Type": "application/json" }
    }
    return axios.post("/api/account/login", JSON.stringify({ username, password }), config)
}

export const createAccount = (tokenID: string, username: string, password: string, authorities: string[]) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": tokenID
        }
    }
    const data = {
        username: username,
        password: password,
        authorities: authorities
    }
    return axios.post("/api/users", data, config)
}


/* Pencil */

export const modifyAccount = (tokenID: string, link: string, username: string, password: string, authorities: string[]) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": tokenID,
            "username": username
        }
    }

    const data = {
        username: username,
        password: password,
        authorities: authorities
    }

    return axios.put(link, data, config)
}


/* get */

export const getAccounts = (tokenID: string) => {
    const config = {
        data: {}, /* data must be set or else headers.Content-Type will be ignored */
        headers: {
            "Content-Type": "application/json",
            "Authorization": tokenID
        }
    }
    return axios.get("/api/users", config)
}


/* delete */

export const deleteAccount = (username: string, link: string, tokenID: string) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": tokenID,
            "username": username
        }
    }
    // console.log(link_delete + username)
    // console.log(config)
    return axios.delete(link + username, config)
}

/* logout */

export const logout = (tokenID: string) => {
    const config = {
        headers: {
            "Authorization": tokenID
        }
    }
    return axios.delete("/api/account/logout", config)
}
/* delete room*/

export const deleteRoom = (roomName: string, link: string) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "roomName": roomName
        }
    }
    return axios.delete(link + roomName, config)
}

    export const createRoom = ({name, openingAt, closingAt, openingDays, width, height}, tokenID: string) => {
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
        return axios.post("/api/rooms", data, config)
    }
