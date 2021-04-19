import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person'
import SecurityIcon from '@material-ui/icons/Security';
import WorkIcon from '@material-ui/icons/Work';
import BathtubIcon from '@material-ui/icons/Bathtub';
import { FormLabel, FormHelperText } from '@material-ui/core';
import Token from './Token';
import axios from 'axios';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme';

import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';


export default function FormDialog(formAccount: any) {

  const [open, setOpen] = React.useState(false);

  const [delHimselfErr, setDelHimselfErr] = React.useState("");

  const [isConfirmDisabled, setIsConfirmDisabled] = React.useState(false);
  /* error messages */
  const dontkys = "Non puoi cancellare il tuo account";

  const { enqueueSnackbar } = useSnackbar();

  const handleMessage = (message: string, variant: VariantType) => {
    // variant can be 'success', 'warning', 'error'
    enqueueSnackbar(message, {variant});
  }

  const handleClickOpen = () => {
    if(adminControl()) {
      setIsConfirmDisabled(true);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {

    if(!adminControl()) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": Token.getId(),
          "username": formAccount.username
        }
      }

      axios.delete(formAccount.link_delete + formAccount.username, config)
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
  };

  /**
  * Checking if admin has opened the delete window of his/her account
  * @params
  * @returns
  *   true if admin is trying to delete himself/herself
  *   false otherwise
  */
  const adminControl = (): boolean => {
    if(formAccount.username === Token.getUsername()) {
      setDelHimselfErr(dontkys);
      return true;
    }
    else return false;

  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <IconButton className="trash" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Sei sicuro di eliminare {formAccount.username}?</DialogTitle>
          <DialogContent className="central">
          <div className="alignCentralPencil">
            <PersonIcon fontSize="large" />
          
            <DialogContentText>
              {formAccount.username}
            </DialogContentText>
            
            <FormLabel>
              {formAccount.authorities.length > 1 ? "Ruoli: " : "Ruolo: "}
            </FormLabel>
            {
            formAccount.authorities.map( (auth) => {
              switch(auth){
                case "ADMIN":
                  return (
                    <div className="tooltip">
                      <SecurityIcon className="adminIcon" />
                      <span className="tooltiptext">Admin</span>
                    </div>
                  )
                case "USER":
                  return (
                    <div className="tooltip">
                      <WorkIcon className="userIcon" />
                      <span className="tooltiptext">Utente</span>
                    </div>
                  )
                case "CLEANER":
                  return (
                    <div className="tooltip">
                      <BathtubIcon className="cleanerIcon" />
                      <span className="tooltiptext">Addetto alle pulizie</span>
                    </div>
                  )
              }
            })
            }
          </div>

            <FormHelperText id="trashMessage">{delHimselfErr}</FormHelperText>

          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose} id="decline">
              Annulla
            </Button>
            <Button
              variant="outlined"
              id="confirm"
              onClick={handleConfirm}
              disabled={isConfirmDisabled}>
              Conferma
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
