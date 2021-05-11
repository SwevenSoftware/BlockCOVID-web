/* react */
import React, { Component } from 'react'
/* redux */
import { connect } from 'react-redux'
import { createRoom } from '../actions/roomsActions'
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
    isModalOpen: boolean
}

class NewRoomComponent extends Component<NewRoomProps, NewRoomStates> {
    constructor(props) {
        super(props)
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
                                    {/* TODO: add grid of the room */}
                                    <TextField
                                        required
                                        id="outlined-search"
                                        label="Nome stanza"
                                        variant="outlined"
                                        // TODO: implement error, helperText, value, onChange
                                    />
                                    {/* TODO: add fields such as opening times, closing time, week days and sizes */}
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
                                this.handleConfirm()
                            }}
                                id="confirm" variant="outlined">
                                Conferma
                 </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </ThemeProvider>
        )
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


    private handleConfirm(): void {
      // TODO: implement confirmation
    }

    private roomNameValidate(roomName: string): boolean {
        let reg = new RegExp("^[a-zA-Z0-9]{5,16}$")
        if (!roomName.match(reg)) {
            // TODO: set error (state) to true
            return true
        } else {
            // TODO: set error (state) to false
            return false
        }
    }
}

const mapStateToProps = (state) => {
    return {
        state: {
            rooms: state.rooms
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: {
            createRoom: (data: any) => {
              dispatch(createRoom(data))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewRoomComponent)