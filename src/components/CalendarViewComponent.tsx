/* react */
import React, { Component } from "react"
/* redux */
import { connect } from "react-redux"
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
	constructor(props) {
		super(props)
		this.state = {
			data: appointments,
			currentDate: new Date(),
			isModalOpen: false,
		}
		this.handleClickOpen = this.handleClickOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}

	render() {
		const { data, currentDate } = this.state
		console.log(this.state.currentDate)
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
					<DialogTitle
						id="form-dialog-title"
						className="modalTitle"
					>
						Calendario prenotazioni di {this.props.data.user.username}
					</DialogTitle>
					<DialogContent>
						<Paper>
							<Scheduler 
								data={data}
								height={660}
							>
								<ViewState
									currentDate={currentDate}
									onCurrentDateChange={this.currentDateChange}
								/>
								<WeekView startDayHour={9} endDayHour={19} />
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

	private currentDateChange(): void {
		this.setState({ currentDate: new Date() })
	}

	private handleClickOpen(): void {
		this.setState({ isModalOpen: true })
	}

	private handleClose(): void {
		this.setState({ isModalOpen: false })
	}
}

const mapStateToProps = (state: any) => {
	return {
		state: {
			//ToCheck
			//error: state.calendar.error
		},
	}
}

const mapDispatchToProps = (dispatch: Function) => {
	return {
		dispatch: {},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CalendarViewComponent)
