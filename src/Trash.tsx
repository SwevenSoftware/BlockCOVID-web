import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person'
import SecurityIcon from '@material-ui/icons/Security';
import WorkIcon from '@material-ui/icons/Work';
import BathtubIcon from '@material-ui/icons/Bathtub';

import Token from './Token';
import axios from 'axios';

export default function FormDialog(formAccount: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": Token.getId(),
        "username": formAccount.username
      }
    }

    axios.delete("/api/admin/user/" + formAccount.username, config)
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
      <IconButton className="trash" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sei sicuro di eliminare {formAccount.username}?</DialogTitle>
        <DialogContent className="trashField">
        <PersonIcon fontSize="large" />
          <DialogContentText>
            {formAccount.username}
          </DialogContentText>
          <DialogContentText>
            {formAccount.authorities.length > 1 ? "Ruoli:" : "Ruolo:"} {
              formAccount.authorities.map( (auth) => {
                switch(auth){
                  case "ADMIN": return <SecurityIcon/>; break;
                  case "USER": return <WorkIcon/>; break;
                  case "CLEANER": return <BathtubIcon/>; break;
                }
              })
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="decline">
            Annulla
          </Button>
          <Button onClick={handleConfirm} className="confirm" >
            Conferma
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
