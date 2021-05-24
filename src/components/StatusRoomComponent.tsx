/* react */
import React, { Component, createRef, RefObject } from "react"
/* redux */
import { connect } from "react-redux"
import roomActionResolver from "../actions/roomsActions"
/* material-ui */
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"
import CreateIcon from "@material-ui/icons/Create"
import DeleteIcon from "@material-ui/icons/Delete"
import PersonIcon from "@material-ui/icons/Person"
import SecurityIcon from "@material-ui/icons/Security"
import WorkIcon from "@material-ui/icons/Work"
import BathtubIcon from "@material-ui/icons/Bathtub"
import { FormLabel, FormHelperText } from "@material-ui/core"
/* styles */
// import { ThemeProvider } from '@material-ui/core/styles'
// import { theme } from '../theme'
/* others */
import DotGrid from "../DotGrid"

interface StatusRoomProps {
	state: any
	dispatch: any
	data: any
}

interface StatusRoomStates {
	isModalOpen: boolean
}

class StatusRoomComponent extends Component<StatusRoomProps, StatusRoomStates> {
	refDotGrid: RefObject<DotGrid>
	constructor(props) {
		super(props)
		this.state = {
			isModalOpen: false,
		}
		this.refDotGrid = createRef<DotGrid>()
		this.handleClickOpen = this.handleClickOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)
	}

	render() {
		return (
			<div>
				<IconButton
					className="pencil"
					onClick={() => this.handleClickOpen()}
				>
					{this.props.data.room.name}
				</IconButton>
				<Dialog
					open={this.state.isModalOpen}
					onClose={this.handleClose}
					maxWidth="sm"
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						'{this.props.data.room.name}'
					</DialogTitle>
					<DialogContent className="centralGrid">
						<div className="centralGrid">
							<DotGrid
								mode="deleteGrid"
								ref={this.refDotGrid}
								data={{
									width: this.props.data.room.width,
									height: this.props.data.room.height,
									desks: this.props.data.room.desks,
								}}
							/>
						</div>
					</DialogContent>
					<DialogContent>
						<DialogContentText color="primary">
							Dimensioni stanza:
						</DialogContentText>
						<FormLabel>
							{this.props.data.room.height}x
							{this.props.data.room.width}
						</FormLabel>
						<DialogContentText color="primary">
							Orario di apertura:
						</DialogContentText>
						<FormLabel>
							{this.props.data.room.openingTime} -{" "}
							{this.props.data.room.closingTime}
						</FormLabel>
						<DialogContentText color="primary">
							Giorni di apertura:
						</DialogContentText>
						<FormLabel>
							{this.props.data.room.openingDays.join(", ")}
						</FormLabel>
					</DialogContent>
					<DialogActions>
						<Button
							variant="outlined"
							onClick={this.handleClose}
							id="decline"
						>
							Chiudi
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		)
	}

	/**
	 * Sets the window visibility to visible
	 * @params
	 * @returns
	 */
	private handleClickOpen(): void {
		this.setState({ isModalOpen: true })
	}

	/**
	 * Sets the window visibility to not visible
	 */
	private handleClose(): void {
		this.setState({ isModalOpen: false })
	}

	/**
	 * @params
	 * @returns
	 */
	private handleConfirm(): void {
		this.props.dispatch.deleteRoom("api/rooms/", {
			roomName: this.props.data.room.name,
		})
		this.handleClose()
	}
}

const mapStateToProps = (state: any) => {
	return {
		state: {
			error: state.rooms.error,
		},
	}
}

const mapDispatchToProps = (dispatch: Function) => {
	return {
		dispatch: {
			deleteRoom: (url: string, data: { roomName: string }) => {
				dispatch(roomActionResolver.deleteRoom(url, data))
			},
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusRoomComponent)
