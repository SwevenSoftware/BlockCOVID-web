/* react */
import React, { Component } from 'react'
/* redux */
import { connect } from 'react-redux'
import { newUserConfirm } from '../actions/newUserActions'
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
  authorities: any
}

class NewUserComponent extends Component<NewUserProps, NewUserStates> {
  constructor(props) {
    super(props)
    this.handleChangeAuthorities = this.handleChangeAuthorities.bind(this),
    this.handleClickOpenButton = this.handleClickOpenButton.bind(this),
    this.handleCloseButton = this.handleCloseButton.bind(this)
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
      }
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

  private setButton(): void { // TODO: if condition
    // if(username && password && confirmPassword && authorities) {
    //   this.setState({isButtonDisabled: false})
    // }
    // else {
    //   this.setState({isButtonDisabled: true})
    // }
  }

  private handleChangeAuthorities(): void { // TODO: implementation
    // this.setState({...this.state })
  }

  private handleClickOpenButton(): void {
    this.setState({isButtonDisabled: true})
  }

  private handleCloseButton() {
    this.setState({usernameValue: ""})
    this.setState({passwordValue: ""})
    this.setState({confirmPasswordValue: ""})
    this.setState({isButtonDisabled: true})
    this.setState({
      authorities: {
        checkedAdmin: false,
        checkedUser: false,
        checkedCleaner: false
      }
    })
    // TODO:
   }
}

const mapStateToProps = (state) => {
  return {
    state: {
      newUser: state.newUser
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
