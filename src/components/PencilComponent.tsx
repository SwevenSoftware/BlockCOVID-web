/* react */
import React, { Component } from 'react';

/* redux */
import { connect } from 'react-redux'
import {} from '../actions/pencilActions'

/* api */
import { modifyAccount } from '../api'

/* types */
import {

} from '../types'

/* material-ui */
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormGroup, FormLabel, FormControl, withStyles, FormHelperText } from '@material-ui/core';

/* styles */
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from '../theme';
import '..styles.css'

/* others */
import { VariantType, useSnackbar } from 'notistack';

const GreenCheckbox = withStyles({
   root: {
     color: "#689f38",
     '&$checked': {
       color: "#689f38",
     },
   },
   checked:{},
}) ((props:CheckboxProps) => <Checkbox color="default" {...props} />);

interface PencilProps {
   state: any,
   dispatch: any
}

interface PencilState {
   passwordValue: string,
   confirmPasswordValue: string,
   isButtonDisabled: boolean,
   isPencilOpen: boolean,
   authorities: any,
   passwordError: boolean,
   confirmPasswordError: boolean,
   authoritiesError: boolean,
   lengthPasswordError: boolean
}

class PencilComponent extends Component<PencilProps, PencilState> {
   constructor(props) {
      super(props);
      this.handleChangeAuthorities = this.handleChangeAuthorities.bind(this),
      this.handleChangePassword = this.handleChangePassword.bind(this),
      this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this),
      this.handleClickOpenButton = this.handleClickOpenButton.bind(this),
      this.handleCloseButton = this.handleCloseButton.bind(this),
      this.handleConfirm = this.handleConfirm.bind(this),

      this.state = {
         passwordValue: "",
         confirmPasswordValue: "",
         isButtonDisabled: true,
         isPencilOpen: false,
         authorities: {
            checkedAdmin: false,
            checkedUser: false,
            checkedCleaner: false
         },
         passwordError: false,
         confirmPasswordError: false,
         authoritiesError: false,
         lengthPasswordError: false
      }
   }

   render() {
      return (
         <div>PIZZA</div>
      )
   }

   componentDidMount() {
      this.setButton()
   }

   private setButton(
      password: string = this.state.passwordValue,
      confirmPassword: string = this.state.confirmPasswordValue,
      authorities: boolean[] = this.state.authorities): void {
         if (password && confirmPassword && authorities){
            this.setState({isButtonDisabled: false})
         } else {
            this.setState({isButtonDisabled: true})
         }
   }

   private handleChangeAuthorities(event: React.ChangeEvent<HTMLInputElement>) {
      this.setState({ authorities: { ...this.state.authorities, [event.target.name]: event.target.checked } });
      switch(event.target.name) {
        case "checkedAdmin":
          this.authInputControl([event.target.checked, this.state.authorities.checkedUser, this.state.authorities.checkedCleaner]);
        break;
        case "checkedUser":
          this.authInputControl([this.state.authorities.checkedAdmin, event.target.checked, this.state.authorities.checkedCleaner]);
        break;
        case "checkedCleaner":
          this.authInputControl([this.state.authorities.checkedAdmin, this.state.authorities.checkedUser, event.target.checked]);
        break;
   }
}

   private handleChangePassword(password: string) : void {
      this.setState({passwordValue: password.trim()})
      this.setButton(password)
   }

   private handleChangeConfirmPassword(confirmPassword: string) : void {
      this.setState({confirmPasswordValue: confirmPassword.trim()})
      this.setButton(this.state.passwordValue, confirmPassword)
   }

   private handleClickOpenButton() {
      this.setState({isPencilOpen: true}) 
   }

   private handleCloseButton() {
      this.setState({
        passwordValue: "",
        confirmPasswordValue: "",
        isButtonDisabled: true,
        isPencilOpen: false,
        authorities: {
          checkedAdmin: false,
          checkedUser: false,
          checkedCleaner: false
        },
        passwordError: false,
        confirmPasswordError: false,
        authoritiesError: false,
        lengthPasswordError: false,
      })
   }
}