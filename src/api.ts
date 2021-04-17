import axios from 'axios';
import Token from './Token'

export const login = ({username, password}) => {
  const config = {
    headers: { "Content-Type": "application/json"}
  };

  return axios.post("/api/login", JSON.stringify({username, password}), config);
}

export const trashConfirm = ({username, link_delete}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": Token.getId(),
      "username": username
    }
  }

  return axios.delete(link_delete + username, config);
}