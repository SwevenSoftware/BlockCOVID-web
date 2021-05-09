import axios from 'axios'

/* post */

export const login = ({username, password}) => {
  const config = {
    headers: { "Content-Type": "application/json"}
  }
  return axios.post("/api/account/login", JSON.stringify({username, password}), config)
}

/* NewUser */

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

export const modifyAccount = () => {

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
