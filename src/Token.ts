class Token {

    public static getId() : string | null {
        return localStorage.getItem("token_id");
    }

    public static getExpDate() : string | null {
        return localStorage.getItem("token_expiration");
    }

    public static getUsername() : string | null {
        return localStorage.getItem("token_username");
    }

    public static setId(id: string) : void {
        console.log(id);
        localStorage.setItem("token_id", id);
    }

    public static setExpDate(expDate : string) : void {
        console.log(expDate);
        localStorage.setItem("token_expiration", expDate);
    }

    public static setUsername(username : string) : void {
        console.log(username);
        localStorage.setItem("token_username", username);
    }

    public static remove() : void {
        localStorage.removeItem("token_id");
        localStorage.removeItem("token_expiration");
        localStorage.removeItem("token_username");
    }
}

export default Token;
