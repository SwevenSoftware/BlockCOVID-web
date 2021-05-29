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
import DialogTitle from "@material-ui/core/DialogTitle"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import CropFreeIcon from "@material-ui/icons/CropFree"
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
	}

	render() {
		return (
			<div>
				<Button onClick={() => this.handleClickOpen()}>
					{this.props.data.room.name}
				</Button>
				<Dialog
					open={this.state.isModalOpen}
					onClose={this.handleClose}
					maxWidth="sm"
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						{this.props.data.room.name}
					</DialogTitle>
					<ListItem>
						<ListItemIcon className="spacingColorDesk">
							<FiberManualRecordIcon className="deskBooked" />
							<Typography>Prenotato</Typography>
						</ListItemIcon>
						<ListItemIcon className="spacingColorDesk">
							<FiberManualRecordIcon className="deskUsed" />
							<Typography>Occupato</Typography>
						</ListItemIcon>
						<ListItemIcon className="spacingColorDesk">
							<CropFreeIcon />
							<Typography>Libero</Typography>
						</ListItemIcon>
					</ListItem>
					<DialogContent>
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
