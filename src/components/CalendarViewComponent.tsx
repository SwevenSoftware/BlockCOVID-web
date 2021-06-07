/* react */
import React, { Component } from "react"
/* redux */
import { connect } from "react-redux"
import reservationActionsResolver from "../actions/reservationsActions"
/* material-ui */
import Paper from "@material-ui/core/Paper"
import { Button, DialogTitle } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
/* devexpress */
import { ViewState } from "@devexpress/dx-react-scheduler"
import {
	Scheduler,
	WeekView,
	Toolbar,
	DateNavigator,
	Appointments,
	TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui"
/* styles */
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "../theme"
import { CalendarProps } from "@material-ui/pickers/views/Calendar/Calendar"

interface Appointment {
	title: string
	startDate: Date
	endDate: Date
	id: number
	location: string
}

interface CalendarViewProps {
	state: any
	dispatch: any
	data: any
}

interface CalendarViewStates {
	data: Appointment[]
	currentDate: Date
	isModalOpen: boolean
}

class CalendarViewComponent extends Component<
	CalendarViewProps,
	CalendarViewStates
> {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			currentDate: new Date(),
			isModalOpen: false,
		}
		this.handleClickOpen = this.handleClickOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleDateChange = this.handleDateChange.bind(this)
		this.updateReservations = this.updateReservations.bind(this)
	}

	componentDidMount() {
		// this.handleDateChange(new Date())
	}

	render() {
		return (
			<div>
				<Button className="calendar" onClick={this.handleClickOpen}>
					{this.props.data.user.username}
				</Button>
				<Dialog
					open={this.state.isModalOpen}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
					fullWidth
					maxWidth="md"
				>
					<DialogTitle id="form-dialog-title" className="modalTitle">
						{"Calendario prenotazioni di " +
							this.props.data.user.username}
					</DialogTitle>
					<DialogContent>
						<Paper>
							{this.props.state.reservations.error
								? this.props.state.reservations.error
								: ""}
							<Scheduler
								height={660}
								data={this.state.data}
								key={JSON.stringify(this.state.data)}
							>
								<ViewState
									defaultCurrentDate={this.state.currentDate}
									onCurrentDateChange={this.handleDateChange}
								/>
								<WeekView startDayHour={8} endDayHour={20} />
								<Toolbar />
								<DateNavigator />
								<TodayButton />
								<Appointments />
							</Scheduler>
						</Paper>
					</DialogContent>
				</Dialog>
			</div>
		)
	}

	private handleClickOpen(): void {
		this.setState({
			isModalOpen: true,
			currentDate: new Date(),
		})
	}

	private handleClose(): void {
		this.setState({ isModalOpen: false })
	}

	private handleDateChange(date: Date): void {
		let firstWeekDate = new Date(date)
		firstWeekDate.setDate(firstWeekDate.getDate() - firstWeekDate.getDay())
		let lastWeekDate: Date = new Date(date)
		lastWeekDate.setDate(firstWeekDate.getDate() + 6)
		firstWeekDate.setHours(0, 0, 0)
		lastWeekDate.setHours(23, 59, 59)
		this.updateReservations(firstWeekDate, lastWeekDate)
	}

	updateReservations(startTime: Date, endTime: Date) {
		let stringify = (date: Date) => {
			let dateString: string
			dateString =
				date.getUTCFullYear() +
				"-" +
				(date.getUTCMonth() + 1 < 10
					? "0" + (date.getUTCMonth() + 1)
					: date.getUTCMonth() + 1) +
				"-" +
				(date.getUTCDate() < 10
					? "0" + date.getUTCDate()
					: date.getUTCDate())
			dateString += "T"
			if (date.getUTCHours() < 10) {
				dateString += "0" + date.getUTCHours().toString()
			} else {
				dateString += date.getUTCHours().toString()
			}
			if (date.getUTCMinutes() < 10) {
				dateString += ":0" + date.getUTCMinutes().toString()
			} else {
				dateString += ":" + date.getUTCMinutes().toString()
			}
			return dateString
		}

		this.props.dispatch.getReservationsByUser({
			username: this.props.data.user.username,
			startTime: stringify(startTime),
			endTime: stringify(endTime),
		})
		this.setState({ data: this.populate() })
	}

	private populate(): Appointment[] {
		let appointments: Appointment[] = []
		if (this.props.state.reservations?.reservations) {
			if (
				this.props.state.reservations.reservations[
					this.props.data.user.username
				]
			) {
				this.props.state.reservations.reservations[
					this.props.data.user.username
				].map(
					(reservation: {
						id: string
						deskId: string
						room: string
						username: string
						start: Date
						end: Date
						usageStart: Date | null
						usageEnd: Date | null
						deskCleaned: boolean
						ended: boolean
						_links: any
					}) => {
						appointments.push({
							title: reservation.room,
							startDate: reservation.start,
							endDate: reservation.end,
							id: appointments.length,
							location: reservation.room,
						})
					}
				)
			}
		}
		return appointments
	}
}

const mapStateToProps = (state: any) => {
	return {
		state: {
			reservations: state.reservations,
		},
	}
}

const mapDispatchToProps = (dispatch: Function) => {
	return {
		dispatch: {
			getReservationsByUser: (data: {
				username: string
				startTime: string
				endTime: string
			}) => {
				dispatch(reservationActionsResolver.getReservationsByUser(data))
			},
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CalendarViewComponent)
