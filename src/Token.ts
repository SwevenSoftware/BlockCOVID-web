class Token {

    public static get() : string | null {
        return localStorage.getItem("token_id");
    }

    public static set(token : string) : void {
        localStorage.setItem("token_id", token);
    }

    public static remove() : void {
        localStorage.removeItem("token_id");
    }
}

export default Token;
