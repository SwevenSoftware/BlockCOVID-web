/* react */
import React, { Component } from 'react'
/* redux */
import { connect } from 'react-redux'
import roomActionResolver, { roomInformation } from '../actions/roomsActions';
/* types */
import {
    ERROR_ROOM_NAME_ALREADY_USED,
    ERROR_ROOM_NAME_NOT_AVAILABLE
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
import Grid from '@material-ui/core/Grid'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { FormGroup, FormLabel, FormControl, withStyles, FormHelperText } from '@material-ui/core'
/* styles */
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../theme'
import '../styles.css'
/* others */
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

interface NewRoomProps {
    state: any,
    dispatch: any
}

interface NewRoomStates {
    isButtonDisabled: boolean,
    isModalOpen: boolean,
    selectedOpeningTimeValue: Date,
    selectedClosingTimeValue: Date,
    roomNameValue: string,
    roomNameError: boolean,
}

class NewRoomComponent extends Component<NewRoomProps, NewRoomStates> {
    constructor(props) {
        super(props)
        this.handleClickOpenButton = this.handleClickOpenButton.bind(this),
            this.handleCloseButton = this.handleCloseButton.bind(this),
            this.handleConfirm = this.handleConfirm.bind(this),
            this.handleOpeningTimeChange = this.handleOpeningTimeChange.bind(this),
            this.handleClosingTimeChange = this.handleClosingTimeChange.bind(this),

            this.state = {
                isButtonDisabled: true,
                isModalOpen: false,
                roomNameError: false,
                roomNameValue: "",
                selectedOpeningTimeValue: new Date('2021-01-01T08:00'),
                selectedClosingTimeValue: new Date('2021-01-01T08:00')
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
                            className="modalTitle">
                            Crea una nuova stanza
               </DialogTitle>
                        <DialogContent>
                            <div className="centralModal">
                                <DialogContentText>
                                    Compila i seguenti campi
                                </DialogContentText>
                                <div className="addField">
                                    {/* TODO: add grid of the room */}
                                    <TextField
                                        required
                                        id="outlined-search"
                                        label="Nome stanza"
                                        variant="outlined"
                                        error={this.state.roomNameError}
                                        helperText={this.state.roomNameError ? ERROR_ROOM_NAME_NOT_AVAILABLE : ""}
                                        value={this.state.roomNameValue}
                                        onChange={(e) => {
                                            this.handleChangeRoomName(e.target.value);
                                            this.roomNameValidate(e.target.value);
                                        }}
                                    // TODO: implement error, helperText, value, onChange
                                    />
                                </div>
                                <div className="addField">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Orario di apertura"
                                            ampm={false}
                                            value={this.state.selectedOpeningTimeValue}
                                            onChange={this.handleOpeningTimeChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="addField">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Orario di chiusura"
                                            ampm={false}
                                            value={this.state.selectedClosingTimeValue}
                                            onChange={this.handleClosingTimeChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="addField">
                                    <TextField
                                        required
                                        id="outlined-search"
                                        label="Altezza"
                                        variant="outlined"
                                    // TODO: implement error, helperText, value, onChange
                                    />
                                </div>
                                <div className="addField">
                                    <TextField
                                        required
                                        id="outlined-search"
                                        label="Larghezza"
                                        variant="outlined"
                                    // TODO: implement error, helperText, value, onChange
                                    />
                                    {/* TODO: add fields such as opening times, closing time, week days and sizes */}
                                </div>
                            </div>
                            <div className="centralModal">
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

    handleOpeningTimeChange(date: Date | null) {
        if (date) {
            this.setState({ selectedOpeningTimeValue: date })
        }
    }

    handleClosingTimeChange(date: Date | null) {
        if (date) {
            this.setState({ selectedClosingTimeValue: date })
        }
    }

    componentDidMount() {
        this.setButton()
    }

    private setButton(roomName: string = this.state.roomNameValue): void {
        if (roomName) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
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

    private handleChangeRoomName(roomName: string): void {
        this.setState({ roomNameValue: roomName })
        this.setButton(roomName)
    }

    private handleConfirm(): void {
        // TODO: implement confirmation
    }

    private roomNameValidate(roomName: string): boolean {
        let reg = new RegExp("^[a-zA-Z0-9]{5,16}$")
        if (!roomName.match(reg)) {
            this.setState({ roomNameError: true })
            return true
        } else {
            this.setState({ roomNameError: false })
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
            createRoom: (data: roomInformation) => {
                dispatch(roomActionResolver.createRoom(data))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewRoomComponent)
