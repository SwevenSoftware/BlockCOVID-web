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

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton className="trash"  onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Elimina utente</DialogTitle>
        <DialogContent className="trashField">
        <PersonIcon fontSize="large" />
          <DialogContentText>
            Username
          </DialogContentText>
          <DialogContentText>
            Ruolo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="decline">
            Annulla
          </Button>
          <Button onClick={handleClose} className="confirm" >
            Conferma
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}