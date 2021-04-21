/* react */
import React, { Component } from 'react'
/* redux */
import { connect } from 'react-redux'
import { deleteAccount } from '../actions/trashActions'
/* material-ui */
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import PersonIcon from '@material-ui/icons/Person'
import SecurityIcon from '@material-ui/icons/Security'
import WorkIcon from '@material-ui/icons/Work'
import BathtubIcon from '@material-ui/icons/Bathtub'
import { FormLabel, FormHelperText } from '@material-ui/core'
/* styles */
// import { ThemeProvider } from '@material-ui/core/styles'
// import { theme } from '../theme'
/* others */
import Token from '../Token'

interface TrashProps {
  state: any,
  dispatch: any,
  mode: string,
  data: any
}

interface TrashStates {
  isOpen: boolean,
  isButtonDisabled: boolean
  error: string
}

class TrashComponent extends Component<TrashProps, TrashStates> {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      isButtonDisabled: true,
      error: ""
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  componentDidMount() {
    this.setButton()
  }

  render() {
    console.log(this.props) // WARNING: testing purposes
    return(
        <div>
          <IconButton
            className="trash"
            onClick={(e) => this.handleClickOpen()}>
            <DeleteIcon/>
          </IconButton>
          <Dialog
            open={this.state.isOpen}
            onClose={(e) => this.handleClose()}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Sei sicuro di eliminare {this.props.data.user.username}?</DialogTitle>
            <DialogContent className="central">
              <div className="alignCentralPencil">
                <PersonIcon fontSize="large"/>
                <DialogContentText>
                  {this.props.data.user.username}
                </DialogContentText>
                <FormLabel className={"role_title"}>
                  { this.props.data.user.authorities.length > 1 ? "Ruoli: " : "Ruolo: " }
                </FormLabel>
                {
                  this.props.data.user.authorities.map((auth) => {
                    switch(auth) {
                      case "ADMIN":
                        return(
                          <div className="tooltip">
                            <SecurityIcon className="adminIcon" />
                            <span className="tooltiptext">Admin</span>
                          </div>
                        )
                      case "USER":
                        return(
                          <div className="tooltip">
                            <WorkIcon className="userIcon" />
                            <span className="tooltiptext">Utente</span>
                          </div>
                        )
                      case "CLEANER":
                        return(
                          <div className="tooltip">
                            <BathtubIcon className="cleanerIcon" />
                            <span className="tooltiptext">Addetto alle pulizie</span>
                          </div>
                        )
                    }
                  })
                }
              </div>
              <FormHelperText id="trashMessage">{}</FormHelperText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={(e) => this.handleClose()}
                id="decline"
              >
                Annulla
              </Button>
              <Button
                variant="outlined"
                id="confirm"
                onClick={(e) => this.handleConfirm()}
                disabled={this.state.isButtonDisabled}
              >
                Conferma
              </Button>
            </DialogActions>
          </Dialog>
        </div>

    )
  }

  /**
  * @params
  * @returns
  */
  setButton() {
    if(this.props.data.user.username === this.props.state.tokenID) {
      this.setState({isButtonDisabled: true})
    }
    else this.setState({isButtonDisabled: false})
  }

  /**
  * @params
  * @returns
  */
  handleClickOpen() {
    if(this.props.data.user.username === this.props.state.tokenID) {
      this.setState({isButtonDisabled: true})
    }
    this.setState({isOpen: true})
  }

  /**
  * @params
  * @returns
  */
  handleClose() {
    this.setState({isOpen: false})
  }

  /**
  * @params
  * @returns
  */
  handleConfirm() {
    if(this.props.data.user.username != this.props.state.tokenID) {
      this.props.dispatch.deleteAccount(this.props.data.user.username, this.props.data.user.link, this.props.state.tokenID)
      this.handleClose()
      //window.setTimeout(function() { location.reload() }, 1500)
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    state: {
      tokenID: state.login.token.id,
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
