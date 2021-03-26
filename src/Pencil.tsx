import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormGroup, FormLabel, FormControl, withStyles, FormHelperText } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import Token from './Token';
import axios from 'axios';
import './styles.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme';

import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

const GreenCheckbox = withStyles({
  root: {
    color: "#689f38",
    '&$checked': {
      color: "#689f38",
    },
  },
  checked:{},
}) ((props:CheckboxProps) => <Checkbox color="default" {...props} />);

export default function FormDialog(formAccount: any) {

  const [state, setState] = React.useState({
    checkedAdmin: formAccount.authorities.includes("ADMIN"),
    checkedUser: formAccount.authorities.includes("USER"),
    checkedCleaner: formAccount.authorities.includes("CLEANER")
  });

  const [checked, setChecked] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const [passValue, setPassValue] = React.useState("");
  const [passConfirmValue, setPassConfirmValue] = React.useState("");

  const [passErr, setPassErr] = React.useState("");
  const [passConfirmErr, setPassConfirmErr] = React.useState("");
  const [authErr, setAuthErr] = React.useState("");
  const [isPassErr, setIsPassErr] = React.useState(false);
  const [isPassConfirmErr, setIsPassConfirmErr] = React.useState(false);

  /* error messages */
  const passInvalid = "Password non valida";
  const passConfirmNoMatch = "Le password inserite non corrispondono";
  const noAuthoritiesChecked = "Si prega di scegliere almeno una opzione";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    switch(event.target.name) {
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

  const { enqueueSnackbar } = useSnackbar();

  const handleMessage = (message: string, variant: VariantType) => {
    // variant can be 'success', 'warning', 'error'
    enqueueSnackbar(message, {variant});
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPassValue("");
    setPassConfirmValue("");
    setPassErr("");
    setPassConfirmErr("");
    setAuthErr("");
    setIsPassErr(false);
    setIsPassConfirmErr(false);
    setState({
      checkedAdmin: formAccount.authorities.includes("ADMIN"),
      checkedUser: formAccount.authorities.includes("USER"),
      checkedCleaner: formAccount.authorities.includes("CLEANER")
    });
    setOpen(false);
  };

  /**
  * Password input validation
  * @params password
  * @returns
  *   true if password is invalid (error has occured)
  *   false otherwise
  */
  const passInputControl = (pass: string): boolean => {
    if(pass === "") {
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
    if(pass !== passConfirm) {
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
      if(auth[i]) notChecked = false;
    }
    if(notChecked) {
      setAuthErr(noAuthoritiesChecked);
      console.log(authErr);
      return true;
    }
    else {
      setAuthErr("");
      console.log(authErr);
      return false;
    }
  };

  const handleConfirm = (pass: string, passConfirm: string, auth: boolean[]) => {
    let flagErr = false;
    flagErr = (passInputControl(pass) ? true : flagErr);
    flagErr = (passConfirmInputControl(pass, passConfirm) ? true : flagErr);
    flagErr = (authInputControl(auth) ? true: flagErr);

    if(!flagErr) { /* no input validation error has occured */
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": Token.getId(),
          "username": formAccount.username
        }
      }

      const aux = new Array();
      if(auth[0]) aux.push("ADMIN");
      if(auth[1]) aux.push("USER");
      if(auth[2]) aux.push("CLEANER");

      const data = {
        username: formAccount.username,
        password: pass,
        authorities: aux
      }

      axios.put(formAccount.link_modify, data, config)
        .then((res) => {
          handleClose();
          handleMessage("Operazione eseguita con successo", "success");
          window.setTimeout(function(){location.reload()}, 1500)
        })
        .catch(err => {
            console.log("An error has occured in handleConfirm(): ", err);
            handleMessage("Si è verificato un errore", "error");
        });
    } 
    else {
      handleMessage("Si è verificato un errore", "error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <IconButton className="pencil" onClick={handleClickOpen}>
          <CreateIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Modifica utente {formAccount.username} </DialogTitle>
          <DialogContent>
            <PersonIcon fontSize="large" />
            <DialogContentText>
              Si possono modificare i seguenti campi
            </DialogContentText>
            <div className="addField">
              <TextField
                required
                id="outlined-password-input1"
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
                  if(passConfirmValue != "") {
                    passConfirmInputControl(e.target.value, passConfirmValue);
                  }
                }}
              />
            </div>
            <div className="addField">
              <TextField
                required
                id="outlined-password-input2"
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
            <DialogContentText color="primary">
              * indica i campi obbligatori
            </DialogContentText>

            <FormControl>
              <FormLabel className={"role_title"}>Ruolo:</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<GreenCheckbox checked={state.checkedAdmin} onChange={handleChange} name="checkedAdmin" />}
                    label="Admin"
                  />
                  <FormControlLabel
                    control={<GreenCheckbox checked={state.checkedUser} onChange={handleChange} name="checkedUser" />}
                    label="Utente"
                  />
                  <FormControlLabel
                    control={<GreenCheckbox checked={state.checkedCleaner} onChange={handleChange} name="checkedCleaner" />}
                    label="Addetto alle pulizie"
                  />
                </FormGroup>
                <FormHelperText color="red">{authErr}</FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} id="decline" variant="outlined">
              Annulla
            </Button>
            <Button onClick={() => handleConfirm(passValue, passConfirmValue, [state.checkedAdmin, state.checkedUser, state.checkedCleaner])} id="confirm" variant="outlined">
              Conferma
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
