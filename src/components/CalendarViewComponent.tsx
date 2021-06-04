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
import { appointments } from "../appointments"

interface CalendarViewProps {
	state: any
	dispatch: any
	data: any
}

interface CalendarViewStates {
	data: any
	currentDate: Date
	isModalOpen: boolean
}

class CalendarViewComponent extends Component<
	CalendarViewProps,
	CalendarViewStates
> {
	reservationList: any
	constructor(props) {
		super(props)
		this.reservationList = new Array()
		this.state = {
			data: appointments,
			currentDate: new Date(),
			isModalOpen: false,
		}
		this.handleClickOpen = this.handleClickOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.currentDateChange = this.currentDateChange.bind(this)
	}

	componentDidMount() {
		//console.log(this.props.data.user.username, "mount")
		let reser = {
			username: this.props.data.user.username,
			startTime: "2021-01-01T08:00",
			endTime: "2021-07-01T08:00",
		}
		this.props.dispatch.getReservationsByUser(reser)
		this.reservationList = this.popolate()
	}

	render() {
		const { data, currentDate } = this.state
		//console.log(this.props.state)
		//console.log(this.props.data.user.username, this.reservationList)
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
						Calendario prenotazioni di{" "}
						{this.props.data.user.username}
					</DialogTitle>
					<DialogContent>
						<Paper>
							<Scheduler data={this.reservationList} height={660}>
								<ViewState
									currentDate={currentDate}
									onCurrentDateChange={this.currentDateChange}
								/>
								<WeekView startDayHour={9} endDayHour={19} />
								{/* <Toolbar />
								<DateNavigator />
								<TodayButton />
								<Appointments /> */}
								<>{...this.reservationList}</>
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

	private popolate(): Array<any> {
		let rows: Array<any> = new Array()
		if (this.props.state.reservations?.reservations) {
			console.log("primo")
			if (
				this.props.state.reservations?.reservations[
					this.props.data.user.username
				]
			) {
				console.log("secondo")
				console.log(
					this.props.state.reservations.reservations[
						this.props.data.user.username
					]
				)
				/* this.props.state.reservations.reservations[this.props.data.user.username].map((reservation) => {
					console.log(...reservation)
					let appointment = {
						title: reservation.room,
						startDate: reservation.start,
						endDate: reservation.end,
						id: rows.length,
						location: reservation.room,
					}
					console.log("terzo")
					rows.push(appointment) 
				}) */
			}
		}
		return rows
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
