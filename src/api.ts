import axios from 'axios';

export const login = ({username, password}) => {
  const config = {
    headers: { "Content-Type": "application/json"}
  };

  return axios.post("/api/login", JSON.stringify({username, password}), config);
}
