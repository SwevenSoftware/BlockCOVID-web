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

  const handleClickOpen_Button = () => {
    setOpen_Button(true);
  };

  const handleClose_Button = () => {
    setOpen_Button(false);
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
            />
          </div>
          <DialogContentText color="secondary">
            * indica i campi obbligatori
          </DialogContentText>
          <DialogContentText>
            Ruolo
          </DialogContentText>
          <FormControlLabel
            control={<GreenCheckbox checked={state.checkedAdmin} onChange={handleChange} name="checkedA" />}
            label="Admin"
          />
          <FormControlLabel
            control={<GreenCheckbox checked={state.checkedUser} onChange={handleChange} name="checkedU" />}
            label="Utente"
          />
          <FormControlLabel
            control={<GreenCheckbox checked={state.checkedCleaner} onChange={handleChange} name="checkedC" />}
            label="Addetto alle pulizie"

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose_Button} className="decline" >
            Annulla
          </Button>
          <Button onClick={handleClose_Button} className="confirm" >
            Conferma
          </Button>

          {/* fare una reference e all'interno chiamo i due set */}
          <Message />
        </DialogActions>
      </Dialog>
    </div>
  );
}
