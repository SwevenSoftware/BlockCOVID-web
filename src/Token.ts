class Token {

    public static getId(): string | null {
        return localStorage.getItem("token_id");
    }

    public static getExpDate(): string | null {
        return localStorage.getItem("token_expiration");
    }

    public static getUsername(): string | null {
        return localStorage.getItem("token_username");
    }

    /* method to store every key and value into localstorage
      *   public static set(data: any) : void {
      *     Object.keys(data).map( key =>
      *        localstorage.setItem("token_" + key, data[key])
      *    );
      * }
    */

    public static setId(id: string): void {
        localStorage.setItem("token_id", id);
    }

    public static setExpDate(expDate: string): void {
        localStorage.setItem("token_expiration", expDate);
    }

    public static setUsername(username: string): void {
        localStorage.setItem("token_username", username);
    }

    public static remove(): void {
        localStorage.removeItem("token_id");
        localStorage.removeItem("token_expiration");
        localStorage.removeItem("token_username");
    }
}

export default Token;
