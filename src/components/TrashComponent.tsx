/* react */
import React, { Component } from 'react'
/* redux */
import { connect } from 'react-redux'
import accountActionsResolver from '../actions/accountsActions'
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
/* others */
import { ERROR_USER_CANNOT_BE_DELETED } from '../types'

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
        this.setError()
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
                    open={this.state.isOpen}
                    onClose={(e) => this.handleClose()}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Sei sicuro di eliminare {this.props.data.user.username}?</DialogTitle>
                    <DialogContent className="central">
                        <div className="alignCentralPencil">
                            <PersonIcon fontSize="large" />
                            <DialogContentText>
                                {this.props.data.user.username}
                            </DialogContentText>
                            <FormLabel className={"role_title"}>
                                {this.props.data.user.authorities.length > 1 ? "Ruoli: " : "Ruolo: "}
                            </FormLabel>
                            {
                                this.props.data.user.authorities.map((auth) => {
                                    switch (auth) {
                                        case "ADMIN":
                                            return (
                                                <div className="tooltip" key={this.props.data.user.username + "ADMIN"}>
                                                    <SecurityIcon className="adminIcon" />
                                                    <span className="tooltiptext">Admin</span>
                                                </div>
                                            )
                                        case "USER":
                                            return (
                                                <div className="tooltip" key={this.props.data.user.username + 'USER'}>
                                                    <WorkIcon className="userIcon" />
                                                    <span className="tooltiptext">Utente</span>
                                                </div>
                                            )
                                        case "CLEANER":
                                            return (
                                                <div className="tooltip" key={this.props.data.user.username + 'CLEANER'}>
                                                    <BathtubIcon className="cleanerIcon" />
                                                    <span className="tooltiptext">Addetto alle pulizie</span>
                                                </div>
                                            )
                                    }
                                })
                            }
                        </div>
                        <FormHelperText id="trashMessage">{this.state.error}</FormHelperText>
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
    * @returns true if the user tries to delete his own account
    *          false otherwise
    */
    private isUserDeletingHimself(): boolean {
        return (this.props.data.user.username === this.props.state.token.username)
    }

    /**
    * Disables the confirm button if the user tries to delete himself
    * @params
    * @returns
    */
    private setButton(): void {
        this.setState({ isButtonDisabled: this.isUserDeletingHimself() })
    }

    /**
    * Disables the confirm button if the user tries to delete himself
    * @params
    * @returns
    */
    private setError(): void {
        if (this.isUserDeletingHimself()) {
            this.setState({ error: ERROR_USER_CANNOT_BE_DELETED })
        }
    }

    /**
    * Sets the visibility of the 'deleting' window to visible
    * @params
    * @returns
    */
    private handleClickOpen(): void {
        this.setState({ isOpen: true })
    }

    /**
    * Sets the visibility of the 'deleting' window to not visible
    * @params
    * @returns
    */
    private handleClose(): void {
        this.setState({ isOpen: false })
    }

    /**
    * @params
    * @returns
    */
    private handleConfirm(): void {
        if (!this.isUserDeletingHimself()) {
            this.props.dispatch.deleteAccount(this.props.data.user.username, this.props.data.user.link, this.props.state.token.id)
            this.handleClose()
            //window.setTimeout(function() { location.reload() }, 1500)
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        state: {
            token: state.login.token,
            trash: state.trash
        }
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        dispatch: {
            deleteAccount: (username: string, link: string, tokenID: string) => {
                dispatch(accountActionsResolver.deleteAccount(username, link, tokenID))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrashComponent)
