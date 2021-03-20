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

const GreenCheckbox = withStyles({
  root: {
    color: green[600],
    '&$checked': {
      color: green[600],
    },
  },
  checked:{},
}) ((props:CheckboxProps) => <Checkbox color="default" {...props} />);

export default function FormDialog(formAccount: any) {

  const [state, setState] = React.useState({
    checkedA: false,
    checkedU: false,
    checkedC: false,
  });

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [open, setOpen] = React.useState(false);

  const [passValue, setPassValue] = React.useState('') // TODO: da provare con false

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (pass: string, auth: boolean[]) => {
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
  };

  return (
    <div>
      <IconButton className="pencil" onClick={handleClickOpen}>
        <CreateIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifica l'utente {formAccount.username} </DialogTitle>
        <DialogContent>
          <PersonIcon fontSize="large" />
          {/* <div className="addField">
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Inserire il nome utente del possessore ID"
            variant="outlined"
        />
          </div> */}
          <DialogContentText>
            Si possono modificare i seguenti campi:
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
            />
          </div>
          <DialogContentText color="secondary">
            * indica i campi obbligatori
          </DialogContentText>
          <DialogContentText>
            Ruolo
          </DialogContentText>
          <FormControlLabel
            control={<GreenCheckbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
            label="Admin"
          />
          <FormControlLabel
            control={<GreenCheckbox checked={state.checkedU} onChange={handleChange} name="checkedU" />}
            label="Utente"
          />
          <FormControlLabel
            control={<GreenCheckbox checked={state.checkedC} onChange={handleChange} name="checkedC" />}
            label="Addetto alle pulizie"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="decline">
            Annulla
          </Button>
          <Button onClick={() => handleConfirm(passValue, [state.checkedA, state.checkedU, state.checkedC])} className="confirm">
            Conferma
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
