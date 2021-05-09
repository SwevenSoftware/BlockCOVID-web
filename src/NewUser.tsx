import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormGroup, FormLabel, FormControl, withStyles, FormHelperText } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Token from './Token';
import axios from 'axios';
import { RotateLeft } from '@material-ui/icons';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import './styles.css';


import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

const GreenCheckbox = withStyles({
    root: {
        color: "#689f38",
        '&$checked': {
            color: "#689f38",
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);


export default function FormDialog() {

    const [state, setState] = React.useState({
        checkedAdmin: false,
        checkedUser: false,
        checkedCleaner: false,
    });

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        switch (event.target.name) {
            case "checkedAdmin":
                authInputControl([event.target.checked, state.checkedUser, state.checkedCleaner]);
                break;
            case "checkedUser":
                authInputControl([state.checkedAdmin, event.target.checked, state.checkedCleaner]);
                break;
            case "checkedCleaner":
                authInputControl([state.checkedAdmin, state.checkedUser, event.target.checked]);
                break;
        }
    };

    const [openButton, setOpenButton] = React.useState(false);
    const [userValue, setUserValue] = React.useState("");
    const [passValue, setPassValue] = React.useState("");
    const [passConfirmValue, setPassConfirmValue] = React.useState("");

    const [userErr, setUserErr] = React.useState("");
    const [passErr, setPassErr] = React.useState("");
    const [passConfirmErr, setPassConfirmErr] = React.useState("");
    const [authErr, setAuthErr] = React.useState("");
    const [isUserErr, setIsUserErr] = React.useState(false);
    const [isPassErr, setIsPassErr] = React.useState(false);
    const [isPassConfirmErr, setIsPassConfirmErr] = React.useState(false);

    /* error messages */
    const userInvalid = "Username non valido";
    const userExists = "L'username inserito non è disponibile";
    const passInvalid = "Password non valida. Minimo 8 caratteri";
    const passConfirmNoMatch = "Le password inserite non corrispondono";
    const noAuthoritiesChecked = "Si prega di scegliere almeno una opzione";

    const handleClickOpenButton = () => {
        setOpenButton(true);
    };

    const { enqueueSnackbar } = useSnackbar();

    const handleMessage = (message: string, variant: VariantType) => {
        // variant can be 'success', 'warning', 'error'
        enqueueSnackbar(message, { variant });
    }

    const handleCloseButton = () => {
        setUserValue("");
        setPassValue("");
        setPassConfirmValue("");
        setUserErr("");
        setPassErr("");
        setPassConfirmErr("");
        setAuthErr("");
        setIsUserErr(false);
        setIsPassErr(false);
        setIsPassConfirmErr(false);
        setState({ checkedAdmin: false, checkedUser: false, checkedCleaner: false });
        setOpenButton(false);
    };

    /**
    * User input validation
    * @params username
    * @returns
    *   true if username is invalid (error has occured)
    *   false otherwise
    */
    const userInputControl = (user: string): boolean => {
        let reg = new RegExp("^[a-zA-Z0-9]{5,16}$");
        if (!user.match(reg)) {
            setUserErr(userInvalid);
            setIsUserErr(true);
            return true;
        }
        else {
            setUserErr("");
            setIsUserErr(false);
            return false;
        }
    };

    /**
    * Password input validation
    * @params password
    * @returns
    *   true if password is invalid (error has occured)
    *   false otherwise
    */
    const passInputControl = (pass: string): boolean => {
        if (pass === "") {
            setPassErr(passInvalid);
            setIsPassErr(true);
            return true;
        }
        else {
            setPassErr("");
            setIsPassErr(false);
            return false;
        }
    };

    /**
    * Password confirmation input validation
    * @params password and password confirmation
    * @returns
    *   true if password confirmation is invalid (error has occured)
    *   false otherwise
    */
    const passConfirmInputControl = (pass: string, passConfirm: string): boolean => {
        if (pass !== passConfirm) {
            setPassConfirmErr(passConfirmNoMatch);
            setIsPassConfirmErr(true);
            return true;
        }
        else {
            setPassConfirmErr("");
            setIsPassConfirmErr(false);
            return false;
        }
    };

    /*
    * Authorities input validation
    * @params array of authorities
    * @returns
    *   true if given authorities are invalid (error has occured)
    *   false otherwise
    */
    const authInputControl = (auth: boolean[]): boolean => {
        let notChecked = true;
        for (let i in auth) {
            if (auth[i]) notChecked = false;
        }
        if (notChecked) {
            setAuthErr(noAuthoritiesChecked);
            return true;
        }
        else {
            setAuthErr("");
            return false;
        }
    };

    const handleConfirm = (user: string, pass: string, passConfirm: string, auth: boolean[]) => {
        let flagErr = false;
        flagErr = (userInputControl(user) ? true : flagErr);
        flagErr = (passInputControl(pass) ? true : flagErr);
        flagErr = (passConfirmInputControl(pass, passConfirm) ? true : flagErr);
        flagErr = (authInputControl(auth) ? true : flagErr);

        if (!flagErr) { /* no input validation error has occured */
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Token.getId()
                }
            }

            const aux = new Array();
            if (auth[0]) aux.push("ADMIN");
            if (auth[1]) aux.push("USER");
            if (auth[2]) aux.push("CLEANER");

            const data = {
                username: user,
                password: pass,
                authorities: aux
            }

            axios.post("/api/admin/user/new", data, config)
                .then((res) => {
                    handleCloseButton();
                    // window.location.reload();
                    handleMessage("Operazione eseguita con successo", "success");
                    window.setTimeout(function() { location.reload() }, 1500)
                })
                .catch(err => {
                    console.log("An error has occured in handleConfirm(): ", err);
                    handleMessage("Si è verificato un errore", "error");
                    switch (err.response.status) {
                        case 409: /* user exists, username already taken */
                            setUserErr(userExists);
                            setIsUserErr(true);
                            break;
                    }
                });
        }
        else {
            handleMessage("Si è verificato un errore", "error");
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <div>
                <IconButton className="addColor" onClick={handleClickOpenButton}>
                    <AddBoxIcon fontSize="large" />
                </IconButton>
                <Dialog open={openButton} onClose={handleCloseButton} aria-labelledby="form-dialog-title" className="central" fullWidth maxWidth="xs">
                    <DialogTitle id="form-dialog-title" className="pencilTitle">Crea un nuovo utente</DialogTitle>
                    <DialogContent>
                        <div className="centralPencil">
                            <DialogContentText>
                                Compila i seguenti campi
              </DialogContentText>
                        </div>
                        <div className="alignCentralPencil">
                            <div className="addField">
                                <TextField
                                    required
                                    id="outlined-search"
                                    label="Username"
                                    variant="outlined"
                                    error={isUserErr}
                                    helperText={userErr}
                                    value={userValue}
                                    onChange={(e) => {
                                        setUserValue(e.target.value);
                                        userInputControl(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="addField">
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    error={isPassErr}
                                    helperText={passErr}
                                    value={passValue}
                                    onChange={(e) => {
                                        setPassValue(e.target.value);
                                        passInputControl(e.target.value);
                                        if (passConfirmValue != "") {
                                            passConfirmInputControl(e.target.value, passConfirmValue);
                                        }
                                    }}
                                />
                            </div>
                            <div className="addField">
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="Ripeti Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    error={isPassConfirmErr}
                                    helperText={passConfirmErr}
                                    value={passConfirmValue}
                                    onChange={(e) => {
                                        setPassConfirmValue(e.target.value);
                                        passConfirmInputControl(passValue, e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="centralPencil">
                            <DialogContentText color="primary">
                                * indica i campi obbligatori
            </DialogContentText>
                            <div>
                                <FormLabel className={"role_title"}>Ruolo:</FormLabel>
                            </div>
                            <FormControl>
                                <FormGroup>
                                    <div>
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={state.checkedAdmin} onChange={handleChange} name="checkedAdmin" />}
                                            label="Admin"
                                        />
                                    </div>
                                    <div>
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={state.checkedUser} onChange={handleChange} name="checkedUser" />}
                                            label="Utente"
                                        />
                                    </div>
                                    <div>
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={state.checkedCleaner} onChange={handleChange} name="checkedCleaner" />}
                                            label="Addetto alle pulizie"
                                        />
                                    </div>
                                </FormGroup>
                                <FormHelperText color="red">{authErr}</FormHelperText>
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseButton} id="decline" variant="outlined">
                            Annulla
            </Button>
                        <Button onClick={() => {
                            handleConfirm(userValue, passValue, passConfirmValue, [state.checkedAdmin, state.checkedUser, state.checkedCleaner]);
                        }}
                            id="confirm" variant="outlined">
                            Conferma
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}
