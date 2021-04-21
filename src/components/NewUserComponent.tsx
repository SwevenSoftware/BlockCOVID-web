/* react */
import React from 'react';
import { Component } from 'react'

/* redux */
import { connect } from 'react-redux'
import {newUserConfirm} from '../actions/newUserActions'

/* material-ui */
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
import { FormGroup, FormLabel, FormControl, withStyles, FormHelperText } from '@material-ui/core';

/* notistack */
import { VariantType, useSnackbar } from 'notistack';

/* styles */
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from '../theme';
import './styles.css';

interface NewUserProps {
   NewUserState: any,
   NewUserDispatch: any
}

interface NewUserStates {
   usernameValue: string,
   passwordValue: string,
   confirmPasswordValue: string,
   isButtonDisabled: boolean,
   isNewUserOpen: boolean,
}

class NewUserComponent extends Component<NewUserProps, NewUserStates> {
   constructor(props) {
      super(props);
      //this.handleChangeAuthorities = this.handleChangeAuthorities.bind(this)
   }

   componentDidMount() {
      //this.setButton()
   }

   render() {
      return(
         <div></div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      state: {
         newUserState: state.newUser
      }
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      dispatch: {
         newUser: (data) => {
            dispatch(newUserConfirm(data));
         }
      }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(NewUserComponent)