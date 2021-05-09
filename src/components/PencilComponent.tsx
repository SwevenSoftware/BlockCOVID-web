/* react */
import React, { Component } from 'react';

/* redux */
import { connect } from 'react-redux'
import { pencilConfirm } from '../actions/pencilActions'

/* api */
import { modifyAccount } from '../api'

/* types */
import {
   ERROR_LENGTH_PASSWORD,
   ERROR_WRONG_CONFIRM_PASSWORD,
   ERROR_AUTHORITIES_NOT_SELECTED
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
import '../styles.css'

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
   dispatch: any,
   data: any
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
      <ThemeProvider theme={theme}>
         <div>
         <IconButton 
            className="pencil"
            onClick={() => this.handleClickOpenButton()}>
            <CreateIcon />
         </IconButton>
         <Dialog
            open={this.state.isPencilOpen}
            onClose={() => this.handleCloseButton()}
            aria-labelledby="form-dialog-title"
            fullWidth maxWidth="xs">
            <DialogTitle
               id="form-dialog-title"
               className="pencilTitle">
                  Modifica l'utente {this.props.data.user.username}
            </DialogTitle>
            <DialogContent>
               <div className="alignCentralPencil">
                  <PersonIcon fontSize="large" />
               </div>
               <div className="centralPencil">
               <DialogContentText>
                  Puoi modificare i seguenti campi
               </DialogContentText>
               </div>
               <div className="alignCentralPencil">
                  <div className="addField">
                     <TextField
                        required
                        id="outlined-password-input1"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        error={this.state.passwordError}
                        helperText={this.state.lengthPasswordError ? ERROR_LENGTH_PASSWORD : ""}
                        value={this.state.passwordValue}
                        onChange={(e) => {
                           this.handleChangePassword(e.target.value);
                           this.passInputControl(e.target.value);
                           if(this.state.confirmPasswordValue != "") {
                              this.confirmPassInputControl(e.target.value, this.state.confirmPasswordValue);
                           }
                        }}
                     />
                  </div>
                  <div className="addField">
                     <TextField
                        required
                        id="outlined-password-input2"
                        label="Ripeti Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        error={this.state.confirmPasswordError}
                        helperText={this.state.confirmPasswordError ? ERROR_WRONG_CONFIRM_PASSWORD : ""}
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
               <FormControl>
                  <FormLabel>Ruolo:</FormLabel>
                     <FormGroup>
                        <FormControlLabel
                           control={<GreenCheckbox checked={this.state.authorities.checkedAdmin} onChange={(e) => this.handleChangeAuthorities(e)} name="checkedAdmin" />}
                           label="Admin"
                        />
                        <FormControlLabel
                           control={<GreenCheckbox checked={this.state.authorities.checkedUser} onChange={(e) => this.handleChangeAuthorities(e)} name="checkedUser" />}
                           label="Utente"
                        />
                        <FormControlLabel
                           control={<GreenCheckbox checked={this.state.authorities.checkedCleaner} onChange={(e) => this.handleChangeAuthorities(e)} name="checkedCleaner" />}
                           label="Addetto alle pulizie"
                        />
                     </FormGroup>
                     <FormHelperText color="red">{this.state.authoritiesError ? ERROR_AUTHORITIES_NOT_SELECTED : ""}</FormHelperText>
               </FormControl>
               </div>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => this.handleCloseButton()} id="decline" variant="outlined">
               Annulla
               </Button>
               <Button onClick={() => {
                     this.handleConfirm();
                  }}
                  id="confirm"
                  variant="outlined">
               Conferma
               </Button>
            </DialogActions>
         </Dialog>
         </div>
      </ThemeProvider>
      )
   }

   componentDidMount() {
      this.setButton()
      this.setCheckboxes()
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

   private setCheckboxes() {
      this.setState({
         authorities: {
            checkedAdmin: this.props.data.user.authorities.includes("ADMIN"),
            checkedUser: this.props.data.user.authorities.includes("USER"),
            checkedCleaner: this.props.data.user.authorities.includes("CLEANER")
         },
      })
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

   private handleCloseButton(confirm: boolean = false) {
      this.setState({
         passwordValue: "",
         confirmPasswordValue: "",
         isButtonDisabled: true,
         isPencilOpen: false,
         passwordError: false,
         confirmPasswordError: false,
         authoritiesError: false,
         lengthPasswordError: false,
      })
      if (!confirm) {
         this.setCheckboxes()
      }
   }

   private passInputControl(passwordValue: string = this.state.passwordValue): boolean {
      let reg = new RegExp("^[a-zA-Z0-9]{8,16}$");
      if(passwordValue.match(reg)){
         if (passwordValue === "") {
            this.setState({passwordError: true})
            this.setState({lengthPasswordError: false})
            return true
         } else {
            this.setState({passwordError: false})
            this.setState({lengthPasswordError: false})
            return false
         }
      } else {
         this.setState({passwordError: true})
         this.setState({lengthPasswordError: true})
         return true
      }
   }

   private confirmPassInputControl(passwordValue: string, confirmPasswordValue: string): boolean {
      if (confirmPasswordValue !== passwordValue || confirmPasswordValue === "") {
         this.setState({confirmPasswordError: true})
         this.setState({passwordError: true})
         return true
      } else {
         this.setState({confirmPasswordError: false})
         this.setState({passwordError: false})
         return false
      }
   }

   private authInputControl(auth: boolean[]): boolean {
      let notChecked = true
      for(let i in auth) {
         if (auth[i]) notChecked = false
      }
      if (notChecked) {
         this.setState({authoritiesError: true})
         return true;
      } else {
         this.setState({authoritiesError: false})
         return false;
      }
   }

   private handleConfirm() :void {
      let flagErr = false;
      let auth = [this.state.authorities.checkedAdmin, this.state.authorities.checkedUser, this.state.authorities.checkedCleaner];
      let pass  = this.state.passwordValue;
      let confPass = this.state.confirmPasswordValue;
      flagErr = (this.passInputControl(pass) ? true : flagErr);
      flagErr = (this.confirmPassInputControl(pass, confPass) ? true : flagErr);
      flagErr = (this.authInputControl(auth) ? true : flagErr);

      if (!flagErr) {
        const aux = new Array();
        if(auth[0]) aux.push("ADMIN");
        if(auth[1]) aux.push("USER");
        if(auth[2]) aux.push("CLEANER");
        this.props.dispatch.pencil({tokenID: this.props.state.tokenID, link: this.props.data.user.link, username: this.props.data.user.username, password: this.state.passwordValue, auth: aux} )
        this.handleCloseButton(true)
      } else {
         //message: si è verificato un errore
      }
   }
}

const mapStateToProps = (state) => {
   return {
      state: {
         pencil: state.pencil,
         tokenID: state.login.token.id
      }
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      dispatch: {
         pencil: (data) => {
            dispatch(pencilConfirm(data))
         }
      }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(PencilComponent)

