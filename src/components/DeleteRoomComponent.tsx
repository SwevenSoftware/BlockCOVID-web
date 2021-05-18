/* react */
import React, { Component } from 'react'
/* redux */
import { connect } from 'react-redux'
import roomActionResolver from '../actions/roomsActions';
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
import CardGridComponent from './CardGridComponent'
import DotGrid from '../DotGrid'

interface DeleteRoomProps {
    state: any,
    dispatch: any,
    data: any
}

interface DeleteRoomStates {
    isModalOpen: boolean
}

class TrashComponent extends Component<DeleteRoomProps, DeleteRoomStates> {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
    }

    render() {
        return (

            <div >
                <IconButton
                    className="trash"
                    onClick={(e) => this.handleClickOpen()}>
                    <DeleteIcon />
                </IconButton>
                <Dialog
                    open={this.state.isModalOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Sei sicuro di eliminare '{this.props.data.room.name}'?</DialogTitle>
                    <DialogContent className="central">
                        <div className="alignCentralPencil">
                            <DotGrid
                                mode="deleteGrid"
                                sizeH={10 || 0}
                                sizeW={5 || 0}
                                openingTime="8:00"
                                closingTime="18:00"
                                weekDays="lun - mar - mer - gio - ven"
                            />
                        </div>
                    </DialogContent>
                    <DialogContent>
                        <div>
                            <DotGrid
                                mode="deleteInformation"
                                sizeH={10 || 0}
                                sizeW={7 || 0}
                                openingTime="8:00"
                                closingTime="18:00"
                                weekDays="lun - mar - mer - gio - ven"
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            onClick={this.handleClose}
                            id="decline"
                        >
                            Annulla
              </Button>
                        <Button
                            variant="outlined"
                            id="confirm"
                            onClick={this.handleConfirm}
                        >
                            Conferma
              </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }


    /**
    * Sets the visibility of the window to visible
    * @params
    * @returns
    */
    private handleClickOpen(): void {
        this.setState({ isModalOpen: true })
    }

    /**
    * Sets the visibility of the window to not visible
    * @params
    * @returns
    */
    private handleClose(): void {
        this.setState({ isModalOpen: false })
    }

    /**
    * @params
    * @returns
    */
    private handleConfirm(): void {
        let weekDays = [this.props.data.room.weekDays.monday, this.props.data.room.weekDays.tuesday,
            this.props.data.room.weekDays.wednesday, this.props.data.room.weekDays.thursday,
            this.props.data.room.weekDays.friday, this.props.data.room.weekDays.saturday, this.props.data.room.weekDays.sunday];
        const days = new Array();
        if (weekDays[0]) days.push("MONDAY");
        if (weekDays[1]) days.push("TUESDAY");
        if (weekDays[2]) days.push("WEDNESDAY");
        if (weekDays[3]) days.push("THURSDAY");
        if (weekDays[4]) days.push("FRIDAY");
        if (weekDays[5]) days.push("SATURDAY");
        if (weekDays[6]) days.push("SUNDAY");
        this.props.dispatch.deleteRoom({
            name: this.props.data.room.roomNameValue,
            openingAt: this.props.data.room.openingTimeStringValue,
            closingAt: this.props.data.room.closingTimeStringValue,
            openingDays: days,
            height: this.props.data.room.dimHeight,
            width: this.props.data.room.dimWidth
        })
        this.handleClose()
    }
}

const mapStateToProps = (state: any) => {
    return {
        state: {
            error: state.rooms.error
        }
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        dispatch: {
            deleteRoom: (url: string, data: { roomName: string }) => {
                dispatch(roomActionResolver.deleteRoom(url, data))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrashComponent)
