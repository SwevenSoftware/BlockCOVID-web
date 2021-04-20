import React from 'react';
import Button from '@material-ui/core/Button';
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
import { FormLabel, FormHelperText } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from '../theme';

import { Component } from "react";
import { connect } from 'react-redux';
import Token from '../Token'
import { trashConfirm } from '../actions/trashActions'


interface trashProps {
  state: any,
  dispatch: any
}

interface trashStates {
   isOpen: boolean,
   usernameValue: string,
   errorDelHimself: string,
   isButtonDisabled: boolean,
   isTrashOpen: boolean
}

class TrashComponent extends Component<trashProps, trashStates> {
   constructor(props) {
      super(props);
      this.handleClickOpen = this.handleClickOpen.bind(this),
      this.handleClose = this.handleClose.bind(this),
      this.handleConfirm = this.handleConfirm.bind(this),
      this.state = {
         usernameValue: "",
         isOpen: false,
         errorDelHimself: "Non puoi cancellare il tuo account",
         isButtonDisabled: true,
         isTrashOpen: false
      }
   }

   componentDidMount() {
      this.setButton()
   }

   handleClickOpen() {
      if (this.state.usernameValue === Token.getUsername()) {
         this.setState({isButtonDisabled: true})
      }
      this.setState({isTrashOpen: true})
   }

   handleClose() {
      this.setState({isTrashOpen: false})
   }

   handleConfirm() {
      if (this.state.usernameValue != Token.getUsername()){
         trashConfirm({username: this.state.usernameValue,link_delete: this.props.state.link_delete})
         this.handleClose();
         window.setTimeout(function(){location.reload()}, 1500)
      }
   }

   setButton() {
      if(this.state.usernameValue === Token.getUsername()) {
        this.setState({isButtonDisabled: true})
      }
      else this.setState({isButtonDisabled: false});
   
   };

   render() {
      return (
         <ThemeProvider theme={theme}>
           <div>
             <IconButton 
               className="trash" 
               onClick={(e) => this.handleClickOpen()}>
               <DeleteIcon />
             </IconButton>
             <Dialog 
               open={this.state.isOpen}
               onClose={(e) => this.handleClose()}
               aria-labelledby="form-dialog-title"
               >
               <DialogTitle id="form-dialog-title">Sei sicuro di eliminare {this.state.usernameValue}?</DialogTitle>
               <DialogContent className="central">
               <div className="alignCentralPencil">
                 <PersonIcon fontSize="large" />
               
                 <DialogContentText>
                   {this.state.usernameValue}
                 </DialogContentText>
                 
                 <FormLabel className={"role_title"}>
                   {this.props.state.authorities.length > 1 ? "Ruoli: " : "Ruolo: "}
                 </FormLabel>
                 {
                 this.props.state.authorities.map( (auth) => {
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
     
                 <FormHelperText id="trashMessage">{this.state.errorDelHimself}</FormHelperText>
     
               </DialogContent>
               <DialogActions>
                 <Button variant="outlined" onClick={(e) =>this.handleClose()} id="decline">
                   Annulla
                 </Button>
                 <Button
                   variant="outlined"
                   id="confirm"
                   onClick={(e) => this.handleConfirm()}
                   disabled={this.state.isButtonDisabled}>
                   Conferma
                 </Button>
               </DialogActions>
             </Dialog>
           </div>
         </ThemeProvider>
       );
   }
}

const mapStateToProps = (state: any) => {
  return {
    state: {
      login: state.login,
      trash: state.trash
    }
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    dispatch: {
      deleteAccount: (username: string, link: string, tokenID: string) => {
        dispatch(deleteAccount(username, link, tokenID))
      }
    }
  }
}

 export default connect(
    mapStateToProps,
    mapDispatchToProps
 )(TrashComponent)