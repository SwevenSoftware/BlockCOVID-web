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

import { Component } from "react";
import { connect } from 'react-redux';
import Token from '../Token'
import { trashConfirm } from '../api';

interface trashProps {
   trashState: any,
   trashDispatch: Function
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
      this.state = {
         usernameValue: "",
         isOpen: false,
         errorDelHimself: "Non puoi cancellare il tuo account",
         isButtonDisabled: true,
         isTrashOpen: false
      }
   }

   handleClickOpen() {
      if (this.state.usernameValue === Token.getUsername()) {
         this.setState({isButtonDisabled: true})
      }
   }

   componentDidMount() {
      this.setButton()
   }

   setButton() {
      if(this.state.usernameValue === Token.getUsername()) {
        this.setState({isButtonDisabled: true})
      }
      else this.setState({isButtonDisabled: false});
  
    };
}


const mapStateToProps = (state) => {
   return{
      trashState: state.trash
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
     trashDispatch: data => {
       dispatch(trashConfirm(data));
     }
   }
 }

 export default connect(
    mapStateToProps,
    mapDispatchToProps
 )(TrashComponent)