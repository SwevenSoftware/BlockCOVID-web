/* react */
import React, { Component } from 'react'
/* redux */
import { connect } from 'react-redux'
import { deleteRoom } from '../actions/roomsActions'
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
                                mode="delete"
                                width= {500 || 0}
                                height={500 || 0}
                            />
                        </div>
                        {/*<FormHelperText id="trashMessage"></FormHelperText>*/}
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
        // TODO: implement confirmation
    }
}

const mapStateToProps = (state: any) => {
    return {
        state: {
            rooms: state.rooms
        }
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        dispatch: {
            deleteRoom: (roomName: string, link: string) => {
                dispatch(deleteRoom(roomName, link))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrashComponent)
