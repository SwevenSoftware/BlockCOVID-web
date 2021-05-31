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

import {
	withStyles,
	Theme,
	createStyles,
	makeStyles,
} from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
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

const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head: {
			backgroundColor: "#689f38",
			color: theme.palette.common.white,
		},
		body: {
			fontSize: 14,
		},
	})
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
	createStyles({
		root: {
			"&:nth-of-type(odd)": {
				backgroundColor: theme.palette.action.hover,
			},
		},
	})
)(TableRow)

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
					fullWidth
					maxWidth="sm"
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						{this.props.data.room.name}
					</DialogTitle>
					<ListItem>
						<ListItemIcon className="spacingColorDesk">
							<FiberManualRecordIcon className="deskFree" />
							<Typography>Libero</Typography>
						</ListItemIcon>
						<ListItemIcon className="spacingColorDesk">
							<FiberManualRecordIcon className="deskUsed" />
							<Typography>Occupato</Typography>
						</ListItemIcon>
						<ListItemIcon className="spacingColorDesk">
							<CropFreeIcon />
							<Typography>Vuoto</Typography>
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
							{/* {this.props.data.room.desks.map((desk) => (
								<Typography key={desk.deskId}>
									{"ID: " +
										desk.deskId +
										", X: " +
										desk.x +
										", Y: " +
										desk.y}
								</Typography>
							))} */}
							<TableContainer>
								<Table aria-label="customized table">
									<TableHead>
										<TableRow>
											<StyledTableCell>
												ID
											</StyledTableCell>
											<StyledTableCell align="right">
												X
											</StyledTableCell>
											<StyledTableCell align="right">
												Y
											</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{this.props.data.room.desks.map(
											(desk) => (
												<StyledTableRow
													key={desk.deskId}
												>
													{/* <StyledTableCell component="th" scope="row">
												{desk.deskId}
											</StyledTableCell> */}
													<StyledTableCell>
														{desk.deskId}
													</StyledTableCell>
													<StyledTableCell align="right">
														{desk.x}
													</StyledTableCell>
													<StyledTableCell align="right">
														{desk.y}
													</StyledTableCell>
												</StyledTableRow>
											)
										)}
									</TableBody>
								</Table>
							</TableContainer>
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
