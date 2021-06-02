/* react */
import React, { Component, createRef, RefObject } from "react"
/* redux */
import { connect } from "react-redux"
import roomActionResolver from "../actions/roomsActions"
import { RoomInformation } from "../Api/roomAPI"
/* types */
import {
	ERROR_GRID_RESET_DESK_IS_IN_USE,
	ERROR_INSERTION_NUMBER,
	ERROR_ROOM_NAME_NOT_AVAILABLE,
	ERROR_TIME_NOT_AVAILABLE,
	ERROR_WEEKDAYS_NOT_SELECTED,
} from "../types"
/* material-ui */
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContentText from "@material-ui/core/DialogContentText"
import IconButton from "@material-ui/core/IconButton"
import CreateIcon from "@material-ui/icons/Create"
import { FormLabel, FormHelperText } from "@material-ui/core"
import {
	KeyboardTimePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers"
/* styles */
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "../theme"
/* others */
import "date-fns"
import DateFnsUtils from "@date-io/date-fns"
import DotGrid from "../DotGrid"

interface ModifyRoomProps {
	state: any
	dispatch: any
	data: any
}

interface ModifyRoomState {
	isButtonDisabled: boolean
	isModalOpen: boolean
	openingTimeDateValue: Date
	openingTimeStringValue: string
	closingTimeDateValue: Date
	closingTimeStringValue: string
	dimHeight: number
	dimWidth: number
	heightError: boolean
	widthError: boolean
	roomNameValue: string
	roomNameError: boolean
	weekDays: any
	weekDaysError: boolean
	timeError: boolean
	gridError: string
}

class ModifyRoomComponent extends Component<ModifyRoomProps, ModifyRoomState> {
	refDotGrid: RefObject<DotGrid>
	constructor(props) {
		super(props)
		this.handleClickOpenButton = this.handleClickOpenButton.bind(this)
		this.handleCloseButton = this.handleCloseButton.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)
		this.refDotGrid = createRef<DotGrid>()
		let fakeOpeningDate: Date = new Date()
		let fakeClosingDate: Date = new Date()
		fakeOpeningDate.setUTCHours(
			parseInt(this.props.data.room.openingTime.split(":")[0]),
			parseInt(this.props.data.room.openingTime.split(":")[1]),
			0
		)
		fakeClosingDate.setUTCHours(
			parseInt(this.props.data.room.closingTime.split(":")[0]),
			parseInt(this.props.data.room.closingTime.split(":")[1]),
			0
		)
		this.state = {
			isButtonDisabled: true,
			isModalOpen: false,
			roomNameError: false,
			roomNameValue: this.props.data.room.name,
			openingTimeDateValue: fakeOpeningDate,
			openingTimeStringValue: this.handleTimeChange(
				fakeOpeningDate.getTime()
			).timeString,
			closingTimeDateValue: fakeClosingDate,
			closingTimeStringValue: this.handleTimeChange(
				fakeClosingDate.getTime()
			).timeString,
			weekDays: {
				monday: false,
				tuesday: false,
				wednesday: false,
				thursday: false,
				friday: false,
				saturday: false,
				sunday: false,
			},
			weekDaysError: false,
			timeError: false,
			dimHeight: this.props.data.room.height,
			dimWidth: this.props.data.room.width,
			heightError: false,
			widthError: false,
			gridError: "",
		}
	}

	componentDidMount() {
		this.setButton()
		this.setDays()
		//this.timeInputControl()
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<div>
					<IconButton
						className="greenButton"
						onClick={() => this.handleClickOpenButton()}
					>
						<CreateIcon />
					</IconButton>
					<Dialog
						open={this.state.isModalOpen}
						onClose={() => this.handleCloseButton()}
						aria-labelledby="form-dialog-title"
						fullWidth
						maxWidth="md"
						className="centralModal"
					>
						<DialogTitle
							id="form-dialog-title"
							className="modalTitle"
						>
							Modifica {this.props.data.room.name}
						</DialogTitle>
						<DialogContent className="centralGrid">
							<DialogContentText>
								Puoi modificare i seguenti campi
							</DialogContentText>
							<div className="centralGrid">
								<DotGrid
									mode="modifyGrid"
									ref={this.refDotGrid}
									data={{
										width: this.state.dimWidth,
										height: this.state.dimHeight,
										desks: this.props.data.room.desks,
									}}
								/>
							</div>
							<div className="centralModal">
								<FormHelperText>
									{this.state.gridError}
								</FormHelperText>
								<Button
									id="cleanGrid"
									variant="outlined"
									size="medium"
									onClick={() => {
										if (
											this.refDotGrid.current?.resetView()
										) {
											this.setState({ gridError: "" })
										} else {
											this.setState({
												gridError:
													ERROR_GRID_RESET_DESK_IS_IN_USE,
											})
										}
									}}
								>
									Svuota stanza
								</Button>
							</div>
						</DialogContent>
						<DialogContent>
							<div className="addField">
								<div className="marginUnderGrid">
									<TextField
										required
										id="outlined-search"
										label="Nome stanza"
										variant="outlined"
										error={this.state.roomNameError}
										helperText={
											this.state.roomNameError
												? ERROR_ROOM_NAME_NOT_AVAILABLE
												: ""
										}
										value={this.state.roomNameValue}
										onChange={(e) => {
											this.handleChangeRoomName(
												e.target.value
											)
											this.roomNameValidate(
												e.target.value
											)
										}}
									/>
								</div>
								<div className="addField"></div>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardTimePicker
										margin="normal"
										id="time-picker"
										label="Orario di apertura"
										ampm={false}
										error={this.state.timeError}
										helperText={
											this.state.timeError
												? ERROR_TIME_NOT_AVAILABLE
												: ""
										}
										value={this.state.openingTimeDateValue}
										onChange={(e) => {
											let openingTimeMilliseconds:
												| number
												| undefined = e?.getTime()
											if (openingTimeMilliseconds) {
												let openingTime: {
													time: Date
													timeString: string
												} = this.handleTimeChange(
													openingTimeMilliseconds
												)
												this.setState({
													openingTimeDateValue:
														openingTime.time,
												})
												this.setState({
													openingTimeStringValue:
														openingTime.timeString,
												})
												this.timeInputControl(
													openingTime.time,
													this.state
														.closingTimeDateValue
												)
											} else {
												this.setState({
													timeError: true,
												})
												this.setState({
													openingTimeStringValue: "",
												})
											}
										}}
										KeyboardButtonProps={{
											"aria-label": "change time",
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
										helperText={
											this.state.timeError
												? ERROR_TIME_NOT_AVAILABLE
												: ""
										}
										value={this.state.closingTimeDateValue}
										onChange={(e) => {
											let closingTimeMilliseconds:
												| number
												| undefined = e?.getTime()
											if (closingTimeMilliseconds) {
												let closingTime: {
													time: Date
													timeString: string
												} = this.handleTimeChange(
													closingTimeMilliseconds
												)
												this.setState({
													closingTimeDateValue:
														closingTime.time,
												})
												this.setState({
													closingTimeStringValue:
														closingTime.timeString,
												})
												this.timeInputControl(
													this.state
														.openingTimeDateValue,
													closingTime.time
												)
											} else {
												this.setState({
													timeError: true,
												})
												this.setState({
													closingTimeStringValue: "",
												})
											}
										}}
										KeyboardButtonProps={{
											"aria-label": "change time",
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
									label="Altezza"
									variant="outlined"
									error={this.state.heightError}
									helperText={
										this.state.heightError
											? ERROR_INSERTION_NUMBER
											: ""
									}
									value={this.state.dimHeight}
									onChange={(e) => {
										if (
											this.handleChangeSize(
												e.target.value,
												"dimHeight"
											)
										) {
											if (
												this.refDotGrid.current?.setSize(
													this.state.dimWidth,
													parseInt(e.target.value)
												)
											) {
												this.setState({ gridError: "" })
											} else {
												this.setState({
													gridError:
														ERROR_GRID_RESET_DESK_IS_IN_USE,
												})
											}
										}
									}}
								/>
							</div>
							<div className="addField">
								<TextField
									required
									id="outlined-search"
									label="Larghezza"
									variant="outlined"
									error={this.state.widthError}
									helperText={
										this.state.widthError
											? ERROR_INSERTION_NUMBER
											: ""
									}
									value={this.state.dimWidth}
									onChange={(e) => {
										if (
											this.handleChangeSize(
												e.target.value,
												"dimWidth"
											)
										) {
											if (
												this.refDotGrid.current?.setSize(
													parseInt(e.target.value),
													this.state.dimHeight
												)
											) {
												this.setState({ gridError: "" })
											} else {
												this.setState({
													gridError:
														ERROR_GRID_RESET_DESK_IS_IN_USE,
												})
											}
										}
									}}
								/>
							</div>
							<div className="centralModal">
								<DialogContentText color="primary">
									* indica i campi obbligatori
								</DialogContentText>
								<div className="centralModal">
									<FormLabel>
										Giorni della settimana:
									</FormLabel>
								</div>
								<div className="centralModal">
									<ButtonGroup
										color="primary"
										orientation="vertical"
										size="small"
										aria-label="giorni della settimana in cui la stanza risulta aperta"
										onClick={(e) => {
											let obj: any = e.target
											let day: string =
												obj?.parentElement?.id ||
												obj?.value
											if (day) {
												this.weekDaysInputControl({
													...this.state.weekDays,
													[day]: !this.state.weekDays[
														day
													],
												})
												this.setState({
													weekDays: {
														...this.state.weekDays,
														[day]: !this.state
															.weekDays[day],
													},
												})
											}
										}}
									>
										<Button
											id="monday"
											value="monday"
											variant={
												this.state.weekDays.monday
													? "contained"
													: "outlined"
											}
										>
											Lunedì
										</Button>
										<Button
											id="tuesday"
											value="tuesday"
											variant={
												this.state.weekDays.tuesday
													? "contained"
													: "outlined"
											}
										>
											Martedì
										</Button>
										<Button
											id="wednesday"
											value="wednesday"
											variant={
												this.state.weekDays.wednesday
													? "contained"
													: "outlined"
											}
										>
											Mercoledì
										</Button>
										<Button
											id="thursday"
											value="thursday"
											variant={
												this.state.weekDays.thursday
													? "contained"
													: "outlined"
											}
										>
											Giovedì
										</Button>
										<Button
											id="friday"
											value="friday"
											variant={
												this.state.weekDays.friday
													? "contained"
													: "outlined"
											}
										>
											Venerdì
										</Button>
										<Button
											id="saturday"
											value="saturday"
											variant={
												this.state.weekDays.saturday
													? "contained"
													: "outlined"
											}
										>
											Sabato
										</Button>
										<Button
											id="sunday"
											value="sunday"
											variant={
												this.state.weekDays.sunday
													? "contained"
													: "outlined"
											}
										>
											Domenica
										</Button>
									</ButtonGroup>
									<FormHelperText id="colorError">
										{this.state.weekDaysError
											? ERROR_WEEKDAYS_NOT_SELECTED
											: ""}
									</FormHelperText>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={this.handleCloseButton}
								id="decline"
								variant="outlined"
							>
								Annulla
							</Button>
							<Button
								onClick={() => {
									this.handleConfirm()
								}}
								id="confirm"
								variant="outlined"
							>
								Conferma
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</ThemeProvider>
		)
	}

	private setButton(
		roomName: string = this.state.roomNameValue,
		weekD: boolean[] = this.state.weekDays,
		height: number = this.state.dimHeight,
		width: number = this.state.dimWidth
	): void {
		if (
			roomName &&
			weekD &&
			height != 0 &&
			width != 0 &&
			height != NaN &&
			width != NaN
		) {
			this.setState({ isButtonDisabled: false })
		} else {
			this.setState({ isButtonDisabled: true })
		}
	}

	private setDays() {
		this.setState({
			weekDays: {
				monday: this.props.data.room.openingDays.includes("Lunedì"),
				tuesday: this.props.data.room.openingDays.includes("Martedì"),
				wednesday:
					this.props.data.room.openingDays.includes("Mercoledì"),
				thursday: this.props.data.room.openingDays.includes("Giovedì"),
				friday: this.props.data.room.openingDays.includes("Venerdì"),
				saturday: this.props.data.room.openingDays.includes("Sabato"),
				sunday: this.props.data.room.openingDays.includes("Domenica"),
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
		if (timeOpen > timeClose) {
			this.setState({ timeError: true })
			return true
		} else {
			this.setState({ timeError: false })
			return false
		}
	}

	/**
	 * Changes size value (width room or height room) and returns true if no error has occurred, false otherwise
	 * @param sizeNumber - the value of the size to change. It comes as a string but must be a number
	 * @param size - the name of the size to change. May be equal to "dimHeight" or "dimWidth"
	 * @private
	 */
	private handleChangeSize(sizeNumber: string, size: string): boolean {
		let reg = new RegExp("^[0-9]{1,8}$")
		if (!sizeNumber) {
			this.setState({ ...this.state, [size]: "" })
			if (size === "dimHeight") {
				return !this.heightInputControl(null)
			} else {
				return !this.widthInputControl(null)
			}
		} else if (sizeNumber.match(reg)) {
			let dim: number = parseInt(sizeNumber)
			this.setState({ ...this.state, [size]: dim })
			if (size === "dimHeight") {
				return !this.heightInputControl(dim)
			} else {
				return !this.widthInputControl(dim)
			}
		} else {
			return false
		}
	}

	private heightInputControl(height: number | null): boolean {
		if (!height || height === 0 || height > 20) {
			this.setState({ heightError: true })
			return true
		} else {
			this.setState({ heightError: false })
			return false
		}
	}

	private widthInputControl(width: number | null): boolean {
		if (!width || width === 0 || width > 20) {
			this.setState({ widthError: true })
			return true
		} else {
			this.setState({ widthError: false })
			return false
		}
	}

	handleTimeChange(milliseconds: number): { time: Date; timeString: string } {
		/** converting MaterialUI object to Date object */
		let time: Date = new Date(milliseconds)
		let timeString: string
		if (time.getUTCHours() < 10) {
			timeString = "0" + time.getUTCHours().toString()
		} else {
			timeString = time.getUTCHours().toString()
		}
		if (time.getUTCMinutes() < 10) {
			timeString += ":0" + time.getUTCMinutes().toString()
		} else {
			timeString += ":" + time.getUTCMinutes().toString()
		}
		return { time, timeString }
	}

	private handleClickOpenButton() {
		this.setState({ isModalOpen: true })
	}

	private handleCloseButton() {
		let fakeOpeningDate: Date = new Date()
		let fakeClosingDate: Date = new Date()
		fakeOpeningDate.setUTCHours(
			parseInt(this.props.data.room.openingTime.split(":")[0]),
			parseInt(this.props.data.room.openingTime.split(":")[1]),
			0
		)
		fakeClosingDate.setUTCHours(
			parseInt(this.props.data.room.closingTime.split(":")[0]),
			parseInt(this.props.data.room.closingTime.split(":")[1]),
			0
		)
		this.setState({
			isButtonDisabled: true,
			isModalOpen: false,
			heightError: false,
			dimHeight: this.props.data.room.height,
			dimWidth: this.props.data.room.width,
			widthError: false,
			roomNameError: false,
			openingTimeDateValue: fakeOpeningDate,
			closingTimeDateValue: fakeClosingDate,
			weekDaysError: false,
			roomNameValue: this.props.data.room.name,
			timeError: false,
			openingTimeStringValue: this.handleTimeChange(
				fakeOpeningDate.getTime()
			).timeString,
			closingTimeStringValue: this.handleTimeChange(
				fakeClosingDate.getTime()
			).timeString,
			gridError: "",
		})
		this.setDays()
	}

	private handleChangeRoomName(roomName: string): void {
		this.setState({ roomNameValue: roomName })
		this.setButton(roomName)
	}

	private handleConfirm(): void {
		let flagErr = false
		let weekDays = [
			this.state.weekDays.monday,
			this.state.weekDays.tuesday,
			this.state.weekDays.wednesday,
			this.state.weekDays.thursday,
			this.state.weekDays.friday,
			this.state.weekDays.saturday,
			this.state.weekDays.sunday,
		]

		let roomName = this.state.roomNameValue
		let openT = this.state.openingTimeStringValue
		let closeT = this.state.closingTimeStringValue
		let height = this.state.dimHeight
		let width = this.state.dimWidth

		flagErr = this.roomNameValidate(roomName) ? true : flagErr
		flagErr = this.weekDaysInputControl(weekDays) ? true : flagErr
		flagErr = this.heightInputControl(height) ? true : flagErr
		flagErr = this.widthInputControl(width) ? true : flagErr
		flagErr = !openT ? true : flagErr
		flagErr = !closeT ? true : flagErr
		flagErr = this.timeInputControl(
			this.state.openingTimeDateValue,
			this.state.closingTimeDateValue
		)
			? true
			: flagErr

		if (!flagErr) {
			const days = new Array()
			if (weekDays[0]) days.push("MONDAY")
			if (weekDays[1]) days.push("TUESDAY")
			if (weekDays[2]) days.push("WEDNESDAY")
			if (weekDays[3]) days.push("THURSDAY")
			if (weekDays[4]) days.push("FRIDAY")
			if (weekDays[5]) days.push("SATURDAY")
			if (weekDays[6]) days.push("SUNDAY")
			this.props.dispatch.modifyRoom(this.props.data.room.name, {
				name: roomName,
				openingAt: openT,
				closingAt: closeT,
				openingDays: days,
				height: height,
				width: width,
			})

			const removedDesks = this.refDotGrid.current?.getRemovedDesks()
			const dataRemove = {
				roomName: this.state.roomNameValue,
				desksId:
					removedDesks?.map((d) => d.serverId) ?? new Array<string>(),
			}
			this.props.dispatch.deleteDesk(dataRemove)

			const newDesks = this.refDotGrid.current
				?.getNewDesks()
				.map((desk) => {
					return { x: desk.pos.x + 1, y: desk.pos.y + 1 }
				})
			const dataAdd = {
				roomName: this.state.roomNameValue,
				desks: newDesks ?? new Array(),
			}
			this.props.dispatch.createDesks(dataAdd)

			this.handleCloseButton()
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
			error: state.rooms.error,
		},
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: {
			modifyRoom: (roomName: string, data: RoomInformation) => {
				dispatch(roomActionResolver.modifyRoom(roomName, data))
			},
			createDesks: (data: {
				roomName: string
				desks: [{ x: number; y: number }]
			}) => {
				dispatch(roomActionResolver.createDesks(data))
			},
			deleteDesk: (data: {
				roomName: string
				desksId: Array<string>
			}) => {
				dispatch(roomActionResolver.deleteDesk(data))
			},
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyRoomComponent)
