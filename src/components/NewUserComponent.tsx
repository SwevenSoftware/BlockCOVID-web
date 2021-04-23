/* react */
import React, { Component } from 'react'

/* redux */
import { connect } from 'react-redux'
import { newUserConfirm } from '../actions/newUserActions'

/* api */
import { createAccount } from '../api'

/* material-ui */
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { FormGroup, FormLabel, FormControl, withStyles, FormHelperText } from '@material-ui/core'
/* styles */
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../theme'
import '../styles.css'
/* others */
import { VariantType, useSnackbar } from 'notistack'

interface NewUserProps {
  state: any,
  dispatch: any
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
      this.handleCloseButton = this.handleCloseButton.bind(this),
      this.handleConfirm = this.handleConfirm.bind(this),
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
         //displayError = userError
         this.setState({usernameError: true})
         return true
      } else {
         //displayError = userError empty
         this.setState({usernameError: false})
         return false
      }
   }

   private passInputControl(passwordValue: string = this.state.passwordValue): boolean {
      if (passwordValue === "") {
         //displayError = PasswordError
         this.setState({passwordError: true})
         return true
      } else {
         //displayError = null
         this.setState({passwordError: false})
         return false
      }
   }

   private confirmPassInputControl(
      passwordValue: string = this.state.confirmPasswordValue,
      confirmPasswordValue: string = this.state.confirmPasswordValue): boolean {
         if (confirmPasswordValue !== passwordValue) {
            //displayError = PasswordError
            this.setState({confirmPasswordError: true})
            return true
         } else {
            //displayError = null
            this.setState({confirmPasswordError: false})
            return false
         }
   }

   //todo
   private authInputControl() {
      let notChecked = true
      let auth = [this.state.authorities.checkedAdmin, this.state.authorities.checkedUser, this.state.authorities.checkedCleaner]
      for(let i in auth) {
         if (auth[i]) notChecked = false
      }
      if (notChecked) {
         //authorities error
         return true;
      } else {
         //auth erro empty
         return false;
      }
   }

   private handleConfirm(
      username: string = this.state.usernameValue,
      password: string = this.state.passwordValue,
      confirmPassword: string = this.state.confirmPasswordValue,
      tokenID: string = this.props.state.token,
      auth: boolean[] = [this.state.authorities.checkedAdmin, this.state.authorities.checkedUser, this.state.authorities.checkedCleaner] 
   ) :void {
      let flagErr = false;
      flagErr = (this.userInputControl() ? true : flagErr);
      flagErr = (this.passInputControl() ? true : flagErr);
      flagErr = (this.confirmPassInputControl() ? true : flagErr);
      flagErr = (this.authInputControl() ? true : flagErr);

      if (!flagErr) {
         newUserConfirm({tokenID, username, password, auth} )
         //window.setTimeout(function(){location.reload()}, 1500)
      }
   }
}






const mapStateToProps = (state) => {
  return {
    state: {
      newUser: state.newUser,
      token: state.login.token
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: {
      newUser: (data) => {
        dispatch(newUserConfirm(data))
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUserComponent)
