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
   authorities: any,
   usernameError: boolean,
   passwordError: boolean,
   confirmPasswordError: boolean
}

class NewUserComponent extends Component<NewUserProps, NewUserStates> {
   constructor(props) {
      super(props);
      this.handleChangeAuthorities = this.handleChangeAuthorities.bind(this),
      this.handleClickOpenButton = this.handleClickOpenButton.bind(this),
      this.handleCloseButton = this.handleCloseButton.bind(this)
      this.userInputControl = this.userInputControl.bind(this),
      this.state = {
         usernameValue: "",
         passwordValue: "",
         confirmPasswordValue: "",
         isButtonDisabled: true,
         isNewUserOpen: false,
         authorities: {
            checkedAdmin: false,
            checkedUser: false,
            checkedCleaner: false
         },
         usernameError: false,
         passwordError: false,
         confirmPasswordError: false

      }
   }

   render() {
      return(
         <div></div>
      )
   }

   componentDidMount() {
      this.setButton()
   }

   private setButton(
      username: string = this.state.usernameValue, 
      password: string = this.state.passwordValue, 
      confirmPassword: string = this.state.confirmPasswordValue,
      authorities: boolean[] = this.state.authorities): void {
         if(username && password && confirmPassword && authorities){
            this.setState({isButtonDisabled: false})
         } else {
            this.setState({isButtonDisabled: true})
         }
   }

   private handleChangeAuthorities() {
      this.setState({...this.state, })
   }

   private handleClickOpenButton() {
      this.setState({isButtonDisabled: true}) 
   }

   private handleCloseButton() {
      this.setState({usernameValue: ""})
      this.setState({passwordValue: ""})
      this.setState({confirmPasswordValue: ""})
      this.setState({isButtonDisabled: true})
      this.setState({isNewUserOpen: false})
      this.setState({
         authorities: {
            checkedAdmin: false,
            checkedUser: false,
            checkedCleaner: false
         }
      })
      this.setState({usernameError: false})
      this.setState({passwordError: false})
      this.setState({confirmPasswordError: false})
   }

   private userInputControl(usernameValue: string = this.state.usernameValue): boolean {
      let reg = new RegExp("^[a-zA-Z0-9]{5,16}$");
      if(usernameValue.match(reg)) {
         //displayError = userInvalid
      }
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