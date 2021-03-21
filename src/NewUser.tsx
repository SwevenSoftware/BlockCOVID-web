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
import { withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import Message from './Message/SuccessMessage'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Token from './Token';
import axios from 'axios';

const GreenCheckbox = withStyles({
  root: {
    color: green[600],
    '&$checked': {
      color: green[600],
    },
  },
  checked:{},
}) ((props:CheckboxProps) => <Checkbox color="default" {...props} />);


export default function FormDialog() {

  const [state, setState] = React.useState({
    checkedAdmin: false,
    checkedUser: false,
    checkedCleaner: false,
  });

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [open_Button, setOpen_Button] = React.useState(false);
  const [userValue, setUserValue] = React.useState("");
  const [passValue, setPassValue] = React.useState("");
  const [passConfirmValue, setPassConfirmValue] = React.useState("");

  const [userErr, setUserErr] = React.useState("");
  const [passErr, setPassErr] = React.useState("");
  const [passConfirmErr, setPassConfirmErr] = React.useState("");
  const [isUserErr, setIsUserErr] = React.useState(false);
  const [isPassErr, setIsPassErr] = React.useState(false);
  const [isPassConfirmErr, setIsPassConfirmErr] = React.useState(false);

  /* error messages */
  const userInvalid = "Username non valido";
  const userExists = "L'username inserito non è disponibile";
  const passInvalid = "Password non valida";
  const passConfirmNoMatch = "Le password inserite non corrispondono";

  const handleClickOpen_Button = () => {
    setOpen_Button(true);
  };

  const handleClose_Button = () => {
    setUserErr("");
    setPassErr("");
    setPassConfirmErr("");
    setIsUserErr(false);
    setIsPassErr(false);
    setIsPassConfirmErr(false);
    setOpen_Button(false);
  };

  /**
  * User input validation
  * @params username
  * @returns
  *   true if username is invalid (error has occured)
  *   false otherwise
  */
  const userInputControl = (user: string): boolean => {
    if(user == "") {
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
    if(pass == "") {
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
    if(pass != passConfirm) {
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
    if(notChecked) return true;
    else return false;
  };

  const handleConfirm = (user: string, pass: string, passConfirm: string, auth: boolean[]) => {
    let flagErr = false;
    flagErr = (userInputControl(user) ? true : flagErr);
    flagErr = (passInputControl(pass) ? true : flagErr);
    flagErr = (passConfirmInputControl(pass, passConfirm) ? true : flagErr);
    flagErr = (authInputControl(auth) ? true: flagErr);

    if(!flagErr) { /* no input validation error has occured */
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": Token.getId()
        }
      }

      const aux = new Array();
      if(auth[0]) aux.push("ADMIN");
      if(auth[1]) aux.push("USER");
      if(auth[2]) aux.push("CLEANER");

      const data = {
        username: user,
        password: pass,
        authorities: aux
      }

      axios.post("/api/admin/user/new", data, config)
        .then((res) => {
          console.log(res); // WARNING: for testing purposes
          handleClose_Button();
        })
        .catch(err => {
            console.log("An error has occured in handleConfirm(): ", err);
            switch(err.response.status) {
              case 409: /* user exists, username already taken */
                setUserErr(userExists);
                setIsUserErr(true);
                break;
            }
        });
    }
  };

  return (
    <div>
      <IconButton className="addColor" onClick={handleClickOpen_Button}>
        <AddBoxIcon fontSize="large" />
      </IconButton>
      <Dialog open={open_Button} onClose={handleClose_Button} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nuovo utente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Compila i seguenti campi
          </DialogContentText>
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
                if(passConfirmValue != "") {
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
          <DialogContentText color="secondary">
            * indica i campi obbligatori
          </DialogContentText>
          <DialogContentText>
            Ruolo
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose_Button} className="decline" >
            Annulla
          </Button>
          <Button onClick={() => handleConfirm(userValue, passValue, passConfirmValue, [state.checkedAdmin, state.checkedUser, state.checkedCleaner])} className="confirm" >
            Conferma
          </Button>
          <Message />
        </DialogActions>
      </Dialog>
    </div>
  );
}
