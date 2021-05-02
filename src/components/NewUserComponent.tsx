/* react */
import React, { Component } from 'react'

/* redux */
import { connect } from 'react-redux'
import { newUserConfirm } from '../actions/newUserActions'

/* api */
import { createAccount } from '../api'

/* types */
import {
  ERROR_WRONG_CONFIRM_PASSWORD,
  ERROR_USERNAME_NOT_AVAILABLE
} from '../types'

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

const GreenCheckbox = withStyles({
   root: {
     color: "#689f38",
     '&$checked': {
       color: "#689f38",
     },
   },
   checked:{},
 }) ((props:CheckboxProps) => <Checkbox color="default" {...props} />);

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
      this.handleChangeUsername = this.handleChangeUsername.bind(this),
      this.handleChangePassword = this.handleChangePassword.bind(this),
      this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this),
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
      return (
         <ThemeProvider theme={theme}>
           <div>
             <IconButton 
               className="addColor"
               onClick={() => this.handleClickOpenButton()}>
               <AddBoxIcon fontSize="large" />
             </IconButton>
             <Dialog 
               open={this.state.isNewUserOpen}
               onClose={() => this.handleCloseButton()}
               aria-labelledby="form-dialog-title"
               className="central"
               fullWidth maxWidth="xs">
               <DialogTitle
                  id="form-dialog-title"
                  className="pencilTitle">
                     Crea un nuovo utente
               </DialogTitle>
               <DialogContent>
                 <div className="centralPencil">
                   <DialogContentText>
                     Compila i seguenti campi
                   </DialogContentText>
                 </div>
                 <div className="alignCentralPencil">
                   <div className="addField">
                   <TextField
                     required
                     id="outlined-search"
                     label="Username"
                     variant="outlined"
                     error={this.state.usernameError}
                     helperText={this.state.usernameError ? ERROR_USERNAME_NOT_AVAILABLE : ""}
                     value={this.state.usernameValue}
                     onChange={(e) => {
                         this.handleChangeUsername(e.target.value);
                         this.userInputControl(e.target.value);
                     }}
                   />
                   </div>
                   <div className="addField">
                     <TextField
                       required
                       id="outlined-password-input"
                       label="Password"
                       type="password"
                       autoComplete="current-password"
                       variant="outlined"
                       error={this.state.passwordError}
                       //helperText={this.state.passwordError ? ERROR_WRONG_CONFIRM_PASSWORD : ""}
                       value={this.state.passwordValue}
                       onChange={(e) => {
                         this.handleChangePassword(e.target.value);
                         this.passInputControl(e.target.value);
                         if(this.state.confirmPasswordValue != "") {
                           //this.passInputControl(e.target.value, this.state.confirmPasswordValue);
                         }
                       }}
                     />
                   </div>
                   <div className="addField">
                     <TextField
                       required
                       id="outlined-confirm-password-input"
                       label="Ripeti Password"
                       type="password"
                       autoComplete="current-password"
                       variant="outlined"
                       error={this.state.passwordError}
                       helperText={this.state.confirmPasswordError}
                       value={this.state.confirmPasswordValue}
                       onChange={(e) => {
                         this.handleChangeConfirmPassword(e.target.value);
                         this.confirmPassInputControl(this.state.passwordValue, e.target.value);
                       }}
                     />
                   </div>
                 </div>
                 <div className="centralPencil">
                 <DialogContentText color="primary">
                   * indica i campi obbligatori
                 </DialogContentText>
                 <div>
                   <FormLabel className={"role_title"}>Ruolo:</FormLabel>
                 </div>
                 <FormControl>
                     <FormGroup>
                       <div>
                         <FormControlLabel
                           control={<GreenCheckbox checked={this.state.authorities.checkedAdmin} onChange={(e) => this.handleChangeAuthorities(e)} name="checkedAdmin" />}
                           label="Admin"
                         />
                       </div>
                       <div>
                         <FormControlLabel
                           control={<GreenCheckbox checked={this.state.authorities.checkedUser} onChange={(e) => this.handleChangeAuthorities(e)} name="checkedUser" />}
                           label="Utente"
                         />
                       </div>
                       <div>
                         <FormControlLabel
                           control={<GreenCheckbox checked={this.state.authorities.checkedCleaner} onChange={(e) => this.handleChangeAuthorities(e)} name="checkedCleaner" />}
                           label="Addetto alle pulizie"
                         />
                       </div>
                     </FormGroup>
                     {/* <FormHelperText color="red">{authErr}</FormHelperText> */}
                 </FormControl>
                 </div>
               </DialogContent>
               <DialogActions>
                 <Button onClick={this.handleCloseButton} id="decline" variant="outlined">
                   Annulla
                 </Button>
                 <Button onClick={() => {
                   this.handleConfirm();
                   }}
                   id="confirm" variant="outlined">
                   Conferma
                 </Button>
               </DialogActions>
             </Dialog>
           </div>
         </ThemeProvider>
       );
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

   //in progress
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

   private handleChangeUsername(username: string): void {
      this.setState({usernameValue: username.trim()})
      this.setButton(username)
   }

   private handleChangePassword(password: string) : void {
      this.setState({passwordValue: password.trim()})
      this.setButton(this.state.usernameValue, password)
   }

   private handleChangeConfirmPassword(confirmPassword: string) : void {
      this.setState({confirmPasswordValue: confirmPassword.trim()})
      this.setButton(this.state.usernameValue, this.state.passwordValue, confirmPassword)
   }

   private handleClickOpenButton() {
      this.setState({isNewUserOpen: true}) 
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
      if(!usernameValue.match(reg)) {
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
   private authInputControl(auth: boolean[]): boolean {
      let notChecked = true
      //let auth = [this.state.authorities.checkedAdmin, this.state.authorities.checkedUser, this.state.authorities.checkedCleaner]
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

   private handleConfirm() :void {
      let flagErr = false;
      let auth = [this.state.authorities.checkedAdmin, this.state.authorities.checkedUser, this.state.authorities.checkedCleaner]
      flagErr = (this.userInputControl() ? true : flagErr);
      flagErr = (this.passInputControl() ? true : flagErr);
      flagErr = (this.confirmPassInputControl() ? true : flagErr);
      flagErr = (this.authInputControl(auth) ? true : flagErr);

      if (!flagErr) {
        const aux = new Array();
        if(auth[0]) aux.push("ADMIN");
        if(auth[1]) aux.push("USER");
        if(auth[2]) aux.push("CLEANER");
        this.props.dispatch.newUser({tokenID: this.props.state.tokenID, username: this.state.usernameValue, password: this.state.passwordValue, auth: aux} )
        //window.setTimeout(function(){location.reload()}, 1500)
        this.handleCloseButton()
      } else {
         //message: si è verificato un errore
      }
   }
}






const mapStateToProps = (state) => {
  return {
    state: {
      newUser: state.newUser,
      tokenID: state.login.token.id
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
