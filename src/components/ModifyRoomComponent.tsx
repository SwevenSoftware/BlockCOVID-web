/* react */
import React, { Component, createRef, RefObject } from "react";
/* redux */
import { connect } from 'react-redux'
import roomActionResolver, { roomInformation } from '../actions/roomsActions'
/* types */
import {
    ERROR_INSERTION_NUMBER,
    ERROR_ROOM_NAME_NOT_AVAILABLE,
    ERROR_TIME_NOT_AVAILABLE,
    ERROR_WEEKDAYS_NOT_SELECTED
} from '../types'
/* material-ui */
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import PersonIcon from '@material-ui/icons/Person'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { FormGroup, FormLabel, FormControl, withStyles, FormHelperText } from '@material-ui/core'
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
/* styles */
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../theme'
/* others */
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import DotGrid from '../DotGrid'

interface ModifyRoomProps {
    state: any,
    dispatch: any,
    data: any
}

interface ModifyRoomState {
    isButtonDisabled: boolean,
    isModalOpen: boolean,
    openingTimeDateValue: Date,
    openingTimeStringValue: string,
    closingTimeDateValue: Date,
    closingTimeStringValue: string,
    dimHeight: number,
    dimWidth: number,
    heightError: boolean,
    widthError: boolean,
    roomNameValue: string,
    roomNameError: boolean,
    weekDays: any,
    weekDaysError: boolean,
    timeError: boolean,
}

class ModifyRoomComponent extends Component<ModifyRoomProps, ModifyRoomState> {
    constructor(props) {
        super(props)
        this.handleClickOpenButton = this.handleClickOpenButton.bind(this),
            this.handleCloseButton = this.handleCloseButton.bind(this),
            this.handleConfirm = this.handleConfirm.bind(this),

            this.state = {
                isButtonDisabled: true,
                isModalOpen: false,
                roomNameError: false,
                roomNameValue: this.props.data.room.name,
                openingTimeDateValue: new Date('2021-01-01T08:00'),
                openingTimeStringValue: '8:00',
                closingTimeDateValue: new Date('2031-01-01T18:00'),
                closingTimeStringValue: '18:00',
                weekDays: {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                },
                weekDaysError: false,
                timeError: false,
                dimHeight: this.props.data.room.height,
                dimWidth: this.props.data.room.width,
                heightError: false,
                widthError: false
            }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <Button className="usernameLayout pencil" onClick={() => this.handleClickOpenButton()}>
                        {this.props.data.room.name}
                    </Button>
                    <Dialog
                        open={this.state.isModalOpen}
                        onClose={() => this.handleCloseButton()}
                        aria-labelledby="form-dialog-title"
                        fullWidth maxWidth="md">
                        <DialogTitle
                            id="form-dialog-title"
                            className="pencilTitle">
                            Modifica la stanza '{this.props.data.room.name}'
                        </DialogTitle>
                        <DialogContent>
                            <div className="centralPencil">
                                <DialogContentText>
                                    Puoi modificare i seguenti campi
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
                                        error={this.state.roomNameError}
                                        helperText={this.state.roomNameError ? ERROR_ROOM_NAME_NOT_AVAILABLE : ""}
                                        value={this.state.roomNameValue}
                                        onChange={(e) => {
                                            this.handleChangeRoomName(e.target.value);
                                            this.roomNameValidate(e.target.value);
                                        }}
                                    // TODO: implement error, helperText, value, onChange
                                    />
                                    {/* TODO: add fields such as opening times, closing time, week days and sizes */}
                                </div>
                            </div>
                            {/* <div className="centralPencil">
                                <DialogContentText color="primary">
                                    * indica i campi obbligatori
                                 </DialogContentText>
                            </div> */}
                            <DialogContent className="central">
                                <div className="alignCentralPencil">
                                    <DotGrid
                                        mode="modifyGrid"
                                        sizeH={this.props.data.room.height}
                                        sizeW={this.props.data.room.width}
                                        openingTime={this.props.data.room.openingTime}
                                        closingTime={this.props.data.room.closingTime}
                                        weekDays={this.props.data.room.openingDays}
                                    />
                                </div>
                            </DialogContent>
                            <DialogContent>
                                <div>
                                    <DotGrid
                                        mode="modifyInformation"
                                        sizeH={this.props.data.room.height}
                                        sizeW={this.props.data.room.width}
                                        openingTime={this.props.data.room.openingTime}
                                        closingTime={this.props.data.room.closingTime}
                                        weekDays={this.props.data.room.openingDays}
                                    />
                                </div>
                            </DialogContent>
                            <div className="addField">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Orario di apertura"
                                        ampm={false}
                                        error={this.state.timeError}
                                        helperText={this.state.timeError ? ERROR_TIME_NOT_AVAILABLE : ""}
                                        value={this.state.openingTimeDateValue}
                                        onChange={(e) => {
                                            let openingTimeMilliseconds: number | undefined = e?.getTime()
                                            if (openingTimeMilliseconds) {
                                                let openingTime: { time: Date, timeString: string } = this.handleTimeChange(openingTimeMilliseconds)
                                                this.setState({ openingTimeDateValue: openingTime.time })
                                                this.setState({ openingTimeStringValue: openingTime.timeString })
                                                this.timeInputControl(openingTime.time, this.state.closingTimeDateValue)
                                            } else {
                                                this.setState({ timeError: true })
                                                this.setState({ openingTimeStringValue: "" })
                                            }
                                        }}
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
                                        error={this.state.timeError}
                                        helperText={this.state.timeError ? ERROR_TIME_NOT_AVAILABLE : ""}
                                        value={this.state.closingTimeDateValue}
                                        onChange={(e) => {
                                            let closingTimeMilliseconds: number | undefined = e?.getTime()
                                            if (closingTimeMilliseconds) {
                                                let closingTime: { time: Date, timeString: string } = this.handleTimeChange(closingTimeMilliseconds)
                                                this.setState({ closingTimeDateValue: closingTime.time })
                                                this.setState({ closingTimeStringValue: closingTime.timeString })
                                                this.timeInputControl(this.state.openingTimeDateValue, closingTime.time)
                                            } else {
                                                this.setState({ timeError: true })
                                                this.setState({ closingTimeStringValue: "" })
                                            }
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <DialogContentText>
                                Dimensione stanza
                            </DialogContentText>
                            <div className="addField">
                                <TextField
                                    required
                                    id="outlined-search"
                                    label={"Altezza attuale: "}
                                    variant="outlined"
                                    error={this.state.heightError}
                                    helperText={this.state.heightError ? ERROR_INSERTION_NUMBER : ""}
                                    value={this.state.dimHeight}
                                    onChange={(e) => this.handleChangeSize(e.target.value, "dimHeight")}
                                />
                            </div>
                            <div className="addField">
                                <TextField
                                    required
                                    id="outlined-search"
                                    label="Larghezza"
                                    variant="outlined"
                                    error={this.state.widthError}
                                    helperText={this.state.widthError ? ERROR_INSERTION_NUMBER : ""}
                                    value={this.state.dimWidth}
                                    onChange={(e) => this.handleChangeSize(e.target.value, "dimWidth")}
                                />
                            </div>
                            <div className="centralModal">
                                <DialogContentText color="primary">
                                    * indica i campi obbligatori
                                </DialogContentText>
                                <FormLabel>Giorni della settimana:</FormLabel>
                                <ButtonGroup
                                    color="primary"
                                    orientation="vertical"
                                    size="small"
                                    aria-label="giorni della settimana in cui la stanza risulta aperta"
                                    onClick={(e) => {
                                        let obj: any = e.target
                                        let day: string = obj?.parentElement?.id || obj?.value
                                        if (day) {
                                            this.weekDaysInputControl({ ...this.state.weekDays, [day]: !this.state.weekDays[day] })
                                            this.setState({ weekDays: { ...this.state.weekDays, [day]: !this.state.weekDays[day] } })
                                        }
                                    }}
                                >
                                    <Button id="monday" value="monday" variant={this.state.weekDays.monday ? "contained" : "outlined"}>Lunedì</Button>
                                    <Button id="tuesday" value="tuesday" variant={this.state.weekDays.tuesday ? "contained" : "outlined"}>Martedì</Button>
                                    <Button id="wednesday" value="wednesday" variant={this.state.weekDays.wednesday ? "contained" : "outlined"}>Mercoledì</Button>
                                    <Button id="thursday" value="thursday" variant={this.state.weekDays.thursday ? "contained" : "outlined"}>Giovedì</Button>
                                    <Button id="friday" value="friday" variant={this.state.weekDays.friday ? "contained" : "outlined"}>Venerdì</Button>
                                    <Button id="saturday" value="saturday" variant={this.state.weekDays.saturday ? "contained" : "outlined"}>Sabato</Button>
                                    <Button id="sunday" value="sunday" variant={this.state.weekDays.sunday ? "contained" : "outlined"}>Domenica</Button>
                                </ButtonGroup>
                                <FormHelperText color="red">{this.state.weekDaysError ? ERROR_WEEKDAYS_NOT_SELECTED : ""}</FormHelperText>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseButton} id="decline" variant="outlined">
                                Annulla
                            </Button>
                            <Button onClick={() => {
                                this.handleConfirm()
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
        this.setDays()
    }

    private setButton(
        roomName: string = this.state.roomNameValue,
        weekD: boolean[] = this.state.weekDays,
        height: number = this.state.dimHeight,
        width: number = this.state.dimWidth): void {
        if (roomName && weekD && height != 0 && width != 0 && height != NaN && width != NaN) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    private setDays() {
        this.setState({
            weekDays: {
                monday: this.props.data.room.openingDays.includes("MONDAY"),
                tuesday: this.props.data.room.openingDays.includes("TUESDAY"),
                wednesday: this.props.data.room.openingDays.includes("WEDNESDAY"),
                thurday: this.props.data.room.openingDays.includes("THURSDAY"),
                friday: this.props.data.room.openingDays.includes("FRIDAY"),
                saturday: this.props.data.room.openingDays.includes("SATURDAY"),
                sunday: this.props.data.room.openingDays.includes("SUNDAY"),
            },
        })
    }

    private weekDaysInputControl(weekDays: boolean[]): boolean {
        let notChecked = true
        for (let i in weekDays) {
            if (weekDays[i]) notChecked = false
        }
        this.setState({ weekDaysError: notChecked })
        return notChecked
    }

    private timeInputControl(timeOpen: Date, timeClose: Date): boolean {
        if (timeOpen >= timeClose) {
            this.setState({ timeError: true })
            return true
        } else {
            this.setState({ timeError: false })
            return false
        }
    }

    private handleChangeSize(sizeNumber: string, size: string): void {
        let reg = new RegExp("^[0-9]{1,8}$");
        if (!sizeNumber) {
            this.setState({ ...this.state, [size]: 1 })
            if (size === "dimHeight") {
                this.heightInputControl(1)
            } else {
                this.widthInputControl(1)
            }
        } else if (sizeNumber.match(reg)) {
            let dim: number = parseInt(sizeNumber)
            this.setState({ ...this.state, [size]: dim })
            if (size === "dimHeight") {
                this.heightInputControl(dim)
            } else {
                this.widthInputControl(dim)
            }
        }
    }

    private heightInputControl(height: number): boolean {
        if (height === 0 || height > 20) {
            this.setState({ heightError: true })
            return true
        } else {
            this.setState({ heightError: false })
            return false
        }
    }

    private widthInputControl(width: number): boolean {
        if (width === 0 || width > 20) {
            this.setState({ widthError: true })
            return true
        } else {
            this.setState({ widthError: false })
            return false
        }
    }

    handleTimeChange(milliseconds: number): { time: Date, timeString: string } {
        /** converting MaterialUI object to Date object */
        let time: Date = new Date(milliseconds)
        let timeString: string
        if (time.getHours() < 10) {
            timeString = "0" + time.getHours().toString()
        }
        else {
            timeString = time.getHours().toString()
        }
        if (time.getMinutes() < 10) {
            timeString += ":0" + time.getMinutes().toString()
        }
        else {
            timeString += ":" + time.getMinutes().toString()
        }
        return { time, timeString }
    }


    private handleClickOpenButton() {
        this.setState({ isModalOpen: true })
    }

    private handleCloseButton() {
        this.setState({
            isButtonDisabled: true,
            isModalOpen: false,
            dimHeight: 1,
            heightError: false,
            dimWidth: 1,
            widthError: false,
            weekDays: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
            },
            openingTimeDateValue: new Date('2021-01-01T08:00'),
            closingTimeDateValue: new Date('2031-01-01T18:00'),
            weekDaysError: false,
            roomNameValue: "",
            timeError: false,
            openingTimeStringValue: '8:00',
            closingTimeStringValue: '18:00',
        })
        // if (!confirm) {
        //     this.setDays()
        // }
    }

    private handleChangeRoomName(roomName: string): void {
        this.setState({ roomNameValue: roomName })
        this.setButton(roomName)
    }

    private handleConfirm(): void {
        let flagErr = false;
        let weekDays = [this.state.weekDays.monday, this.state.weekDays.tuesday,
        this.state.weekDays.wednesday, this.state.weekDays.thursday,
        this.state.weekDays.friday, this.state.weekDays.saturday, this.state.weekDays.sunday];

        let openT = this.state.openingTimeStringValue;
        let closeT = this.state.closingTimeStringValue;
        let height = this.state.dimHeight;
        let width = this.state.dimWidth;
        let roomName = this.state.roomNameValue;
        flagErr = (this.roomNameValidate(roomName) ? true : flagErr);
        flagErr = (this.weekDaysInputControl(weekDays) ? true : flagErr);
        flagErr = ((this.heightInputControl(height) && height != NaN) ? true : flagErr);
        flagErr = ((this.widthInputControl(width) && width != NaN) ? true : flagErr);
        flagErr = (!openT ? true : flagErr);
        flagErr = (!closeT ? true : flagErr);

        if (!flagErr) {
            const days = new Array();
            if (weekDays[0]) days.push("MONDAY");
            if (weekDays[1]) days.push("TUESDAY");
            if (weekDays[2]) days.push("WEDNESDAY");
            if (weekDays[3]) days.push("THURSDAY");
            if (weekDays[4]) days.push("FRIDAY");
            if (weekDays[5]) days.push("SATURDAY");
            if (weekDays[6]) days.push("SUNDAY");
            this.props.dispatch.modifyRoom({
                name: this.state.roomNameValue,
                openingAt: this.state.openingTimeStringValue,
                closingAt: this.state.closingTimeStringValue,
                openingDays: days,
                height: this.state.dimHeight,
                width: this.state.dimWidth
            })
            this.handleCloseButton()
        } else {
            //message errore
        }
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
            error: state.rooms.error
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: {
            modifyRoom: (url: string, roomName: string, data: roomInformation) => {
                dispatch(roomActionResolver.modifyRoom(url, roomName, data))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModifyRoomComponent)
