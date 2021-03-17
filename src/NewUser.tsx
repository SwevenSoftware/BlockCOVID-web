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
    checkedA: false,
    checkedU: false,
    checkedC: false,
  });

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton className="addColor" onClick={handleClickOpen}>
        <AddBoxIcon fontSize="large" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nuovo utente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Compila i campi seguenti
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
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
          </div>
          <DialogContentText>
            Ruolo
          </DialogContentText>
          <FormControlLabel
            control={<GreenCheckbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
            label="Admin"
          />
          <FormControlLabel
            control={<GreenCheckbox checked={state.checkedU} onChange={handleChange} name="checkedU" />}
            label="User"
          />
          <FormControlLabel
            control={<GreenCheckbox checked={state.checkedC} onChange={handleChange} name="checkedC" />}
            label="Cleaner"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" >
            <span className="decline">Annulla</span>
          </Button>
          <Button onClick={handleClose} className="confirm" >
            Conferma
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}