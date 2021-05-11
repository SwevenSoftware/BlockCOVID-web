/* react */
import React, { Component } from 'react'

/* redux */
import { connect } from 'react-redux'
//import { createAccount as newUserConfirm } from '../actions/accountsActions' // to do

/* types */
import {
    //inserire gli errori
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

interface NewRoomProps {
    state: any,
    dispatch: any
}

interface NewRoomStates {
    isButtonDisabled: boolean,
    isModalOpen: boolean,
}

class NewRoomComponent extends Component<NewRoomProps, NewRoomStates> {
    constructor(props) {
        super(props);
        this.handleClickOpenButton = this.handleClickOpenButton.bind(this),
            this.handleCloseButton = this.handleCloseButton.bind(this),
            this.handleConfirm = this.handleConfirm.bind(this),

            this.state = {
                isButtonDisabled: true,
                isModalOpen: false,
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
                        open={this.state.isModalOpen}
                        onClose={() => this.handleCloseButton()}
                        aria-labelledby="form-dialog-title"
                        className="pencilTitle"
                        fullWidth maxWidth="xs">
                        <DialogTitle
                            id="form-dialog-title"
                            className="pencilTitle">
                            Crea una nuova stanza
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
                                        label="RoomName"
                                        variant="outlined"
                                        //error={this.state.usernameError}
                                        //helperText={this.state.usernameError ? ERROR_USERNAME_NOT_AVAILABLE : ""}
                                        //value={this.state.usernameValue}
                                        onChange={(e) => {
                                            //this.handleChangeUsername(e.target.value);
                                            //this.userInputControl(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="centralPencil">
                                <DialogContentText color="primary">
                                    * indica i campi obbligatori
                                 </DialogContentText>
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

    private setButton(): void {

    }


    private handleClickOpenButton() {
        this.setState({ isModalOpen: true })
    }

    private handleCloseButton() {
        this.setState({
            isButtonDisabled: true,
            isModalOpen: false,
        })
    }

    private roomInputControl(roomNameValue: string): boolean {
        let reg = new RegExp("^[a-zA-Z0-9]{5,16}$");
        if (!roomNameValue.match(reg)) {
            //this.setState({ roomNameValue: true })
            return true
        } else {
            //this.setState({ roomNameValue: false })
            return false
        }
    }

    private handleConfirm(): void {

    }
}






const mapStateToProps = (state) => {
    return {
        state: {
            tokenID: state.login.token?.id
            //rooms: state.rooms
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: {
            newUser: (data) => {
                //dispatch(newRoomConfirm(data))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewRoomComponent)
