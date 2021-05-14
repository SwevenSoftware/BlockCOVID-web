import axios, { AxiosResponse, AxiosStatic } from 'axios';

export class accountAPI {
    private axios: AxiosStatic;

    constructor(axios: AxiosStatic) {
        this.axios = axios;
    }

    login(username: string, password: string): Promise<AxiosResponse> {
        const config = {
            headers: { "Content-Type": "application/json" }
        }
        return this.axios.post("/api/account/login", JSON.stringify({ username, password }), config);
    }


    createAccount(tokenID: string, username: string, password: string, authorities: string[]): Promise<AxiosResponse> {
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
        return this.axios.post("/api/users", data, config);
    }

    modifyAccount(tokenID: string, link: string, username: string, password: string, authorities: string[]): Promise<AxiosResponse> {
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

        return this.axios.put(link, data, config);
    }

    getAccounts(tokenID: string): Promise<AxiosResponse> {
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID
            }
        }
        return this.axios.get("/api/users", config);
    }

    deleteAccount(username: string, link: string, tokenID: string): Promise<AxiosResponse> {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenID,
            }
        }
        return this.axios.delete(link + username, config);
    }

    logout(tokenID: string): Promise<AxiosResponse> {
        const config = {
            headers: {
                "Authorization": tokenID,
                "Content-Type": "application/json"
            }
        }
        return this.axios.delete("/api/account/logout", config);
    }
}

export default new accountAPI(axios);