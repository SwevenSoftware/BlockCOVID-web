export const loginTypes = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOGOUT_SUCCESS: "LOGIN_LOGOUT_SUCCESS",
    LOGOUT_FAILURE: "LOGIN_LOGOUT_FAILURE"
}

export const accountTypes = {
    FETCH_SUCCESS: "ACCOUNT_FETCH_SUCCESS",
    FETCH_FAILURE: "ACCOUNT_FETCH_FAILURE",
    CREATE_SUCCESS: "ACCOUNT_CREATE_SUCCESS",
    CREATE_FAILURE: "ACCOUNT_CREATE_FAILURE",
    MODIFY_SUCCESS: "ACCOUNT_MODIFY_SUCCESS",
    MODIFY_FAILURE: "ACCOUNT_MODIFY_FAILURE",
    DELETE_SUCCESS: "ACCOUNT_DELETE_SUCCESS",
    DELETE_FAILURE: "ACCOUNT_DELETE_FAILURE"
}

export const roomTypes = {
    FETCH_SUCCESS: "ROOM_FETCH_SUCCESS",
    FETCH_FAILURE: "ROOM_FETCH_FAILURE",
    CREATE_SUCCESS: "ROOM_CREATE_SUCCESS",
    CREATE_FAILURE: "ROOM_CREATE_FAILURE",
    MODIFY_SUCCESS: "ROOM_MODIFY_SUCCESS",
    MODIFY_FAILURE: "ROOM_MODIFY_FAILURE",
    DELETE_SUCCESS: "ROOM_DELETE_SUCCESS",
    DELETE_FAILURE: "ROOM_DELETE_FAILURE"
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

/* rooms */
export const ERROR_ROOM_NAME_NOT_AVAILABLE = "Min 5 caratteri, max 16"
export const ERROR_ROOM_NAME_ALREADY_USED = "Nome stanza già esistente"
export const ERROR_WEEKDAYS_NOT_SELECTED = "Seleziona almeno un'opzione"
export const ERROR_TIME_NOT_AVAILABLE = "Seleziona uno spazio temporale esistente"
export const ERROR_INSERTION_NUMBER = "Caratteri invalidi. Inserisci solo numeri"

/* others */
export const ERROR_UNKNOWN = "Errore sconosciuto. Si prega di contattare l'amministratore"
export const ERROR_GENERIC_ERROR = "Si è verificato un errore"
