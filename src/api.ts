import axios from 'axios'

export const login = ({username, password}) => {
  const config = {
    headers: { "Content-Type": "application/json"}
  }
  return axios.post("/api/login", JSON.stringify({username, password}), config)
}

export const getAccounts = (tokenID: string) => {
  const config = {
    data: {}, /* data must be set or else headers.Content-Type will be ignored */
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenID
    }
  }
  return axios.get("/api/admin/users", config)
}

export const deleteAccount = (username: string, link: string, tokenID: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenID,
      "username": username
    }
  }
  return axios.delete(link + username, config)
}
