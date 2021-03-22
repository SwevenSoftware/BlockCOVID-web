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
import { withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import Token from './Token';
import axios from 'axios';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme';

const GreenCheckbox = withStyles({
  root: {
    color: "#319e77",
    '&$checked': {
      color: "#319e77",
    },
  },
  checked:{},
}) ((props:CheckboxProps) => <Checkbox color="default" {...props} />);

export default function FormDialog(formAccount: any) {

  const [state, setState] = React.useState({
    checkedAdmin: false,
    checkedUser: false,
    checkedCleaner: false,
  });

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [open, setOpen] = React.useState(false);

  const [passValue, setPassValue] = React.useState('') // TODO: da provare con false
  const [passConfirmValue, setPassConfirmValue] = React.useState('') // TODO: da provare con false

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setPassValue("");
    setOpen(false);
  };

  const handleConfirm = (pass: string, passConfirm: string, auth: boolean[]) => {


    if (pass === passConfirm){
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
            console.log(res); // WARNING: for testing purposes
            handleClose();
          })
          .catch(err => {
              console.log("An error has occured in handleConfirm(): ", err);
              if(err.response.status == 401) { }
              else { }
          });
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
                value={passValue}
                onChange={(e) => setPassValue(e.target.value)}
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
                value={passConfirmValue}
                onChange={(e) => setPassConfirmValue(e.target.value)}
              />
            </div>
            <DialogContentText color="primary">
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
            <Button onClick={handleClose} className="decline">
              Annulla
            </Button>
            <Button onClick={() => handleConfirm(passValue, passConfirmValue, [state.checkedAdmin, state.checkedUser, state.checkedCleaner])} className="confirm">
              Conferma
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
