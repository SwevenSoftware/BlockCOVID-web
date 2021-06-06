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
		this.currentDateChange = this.currentDateChange.bind(this)
	}

	componentDidMount() {
		// TODO: change start time and end time properly
		this.props.dispatch.getReservationsByUser({
			username: this.props.data.user.username,
			startTime: "2021-01-01T08:00",
			endTime: "2021-07-01T08:00",
		})
		this.setState({ data: this.populate() })
	}

	render() {
		return (
			<div>
				<Button
					className="calendar"
					onClick={() => this.handleClickOpen()}
				>
					{this.props.data.user.username}
				</Button>
				<Dialog
					open={this.state.isModalOpen}
					onClose={() => this.handleClose()}
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
							<Scheduler data={this.state.data} height={660}>
								<ViewState
									currentDate={this.state.currentDate}
									onCurrentDateChange={this.currentDateChange}
								/>
								<WeekView startDayHour={8} endDayHour={20} />
								{/* <Toolbar />
								<DateNavigator />
								<TodayButton /> */}
								<Appointments />
							</Scheduler>
						</Paper>
					</DialogContent>
				</Dialog>
			</div>
		)
	}

	private currentDateChange(): void {
		this.setState({ currentDate: new Date() })
	}

	private handleClickOpen(): void {
		this.setState({ isModalOpen: true })
		this.setState({ currentDate: new Date() })
	}

	private handleClose(): void {
		this.setState({ isModalOpen: false })
	}

	private populate(): Appointment[] {
		let appointments: Appointment[] = []
		if (
			this.props.state.reservations?.reservations[
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
