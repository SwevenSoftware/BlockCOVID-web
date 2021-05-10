export const loginTypes = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOGIN_LOGOUT: "LOGOUT",
    LOGIN_LOGOUT_SUCCESS: "LOGIN_LOGOUT_SUCCESS"
}

export const accountTypes = {
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_FAILURE: "FETCH_FAILURE",
    CREATE_SUCCESS: "CREATE_SUCCESS",
    CREATE_FAILURE: "CREATE_FAILURE",
    MODIFY_SUCCESS: "MODIFY_SUCCESS",
    MODIFY_FAILURE: "MODIFY_FAILURE",
    DELETE_SUCCESS: "DELETE_SUCCESS",
    DELETE_FAILURE: "DELETE_FAILURE"
}

/* login */
export const ERROR_USER_NO_AUTH = "Accesso non autorizzato. Si prega di contattare l'amministratore"
export const ERROR_USER_OR_PASS = "Username o password scorretta. Riprova"

/* pencil */
export const ERROR_PASSWORD_VALID = "Password non valida"
export const ERROR_PASSWORD_MATCH = "Le password inserite non corrispondono"
export const ERROR_AUTHORITIES = "Si prega di scegliere almeno una opzione"

/* trash */
export const ERROR_USER_CANNOT_BE_DELETED = "Non puoi eliminare il tuo account"

/* newUser */
export const ERROR_WRONG_CONFIRM_PASSWORD = "Le due password non corrispondono"
export const ERROR_USERNAME_NOT_AVAILABLE = "Min 5 caratteri, max 16"
export const ERROR_AUTHORITIES_NOT_SELECTED = "Seleziona almeno un'opzione"
export const ERROR_LENGTH_PASSWORD = "Lunghezza password necessaria da 8 a 16 caratteri"

/* others */
export const ERROR_UNKNOWN = "Errore sconosciuto. Si prega di contattare l'amministratore"
export const ERROR_GENERIC_ERROR = "Si è verificato un errore"
