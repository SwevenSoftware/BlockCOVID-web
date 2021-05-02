import axios from 'axios'

export const login = ({username, password}) => {
  const config = {
    headers: { "Content-Type": "application/json"}
  }
  return axios.post("/api/account/login", JSON.stringify({username, password}), config)
}

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

export const deleteAccount = (username: string, link_delete: string, tokenID: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenID,
      "username": username
    }
  }
  // console.log(link_delete + username)
  // console.log(config)
  return axios.delete(link_delete + username, config)
}
