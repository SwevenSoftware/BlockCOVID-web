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

interface trashProps {
   trashState: any,
   trashDispatch: Function
}

interface trashStates {
   isTrashOpen: boolean
   usernameValue: string
}

class TrashComponent extends Component<trashProps, trashStates> {
   constructor(props) {
      super(props);
      this.state = {
         usernameValue: "",
         isTrashOpen: false
      }
   }
}