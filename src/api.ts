import axios from 'axios';
import Token from './Token';

export const login = (username: string, password: string) => {
  const config = {
    headers: { "Content-Type": "application/json"}
  };

  const promise = axios.post("/api/login", JSON.stringify({username, password}), config);
  const dataPromise = promise.then((res) =>  res.data);
  return dataPromise;
}
