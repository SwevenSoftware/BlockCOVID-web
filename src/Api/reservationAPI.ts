import axios, { AxiosResponse, AxiosStatic } from "axios"

export class accountAPI {
	private axios: AxiosStatic

   constructor(axios: AxiosStatic) {
		this.axios = axios
	}

   calendar(tokenID: string,
      data:{
         startTime: string
         endTime: string
         username: string
   }) {
      const config = {
         headers: {
            Authorization: tokenID,
            "Content-Type": "application/json",
         }
      }
      return this.axios.get("/api/reservations/view/user/" + data.username, config)
   }
}

export default new accountAPI(axios)
