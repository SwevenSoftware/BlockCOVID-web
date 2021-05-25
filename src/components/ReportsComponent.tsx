/* react */
import React, { Component } from "react"
/* redux */
import { connect } from "react-redux"
import reportActionsResolve from "../actions/reportActions"
/* material-ui */
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Button from "@material-ui/core/Button"
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import FormHelperText from "@material-ui/core/FormHelperText"
/* styles */
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "../theme"
/* others */
import { ReportInformation } from "../Api/reportAPI"

interface ReportsProps {
	state: any
	dispatch: any
}

interface ReportsState {
	orderBy: string
}

class ReportsComponent extends Component<ReportsProps, ReportsState> {
	constructor(props) {
		super(props)
		this.state = {
			orderBy: "",
		}
	}

	componentDidMount() {
		this.props.dispatch.getReports()
	}

	render() {
		console.log(this.props.state)
		return (
			<div className="marginAccounts">
				<ThemeProvider theme={theme}>
					<div className="addRoomsButton">
						<FormControl>
							<InputLabel shrink id="order-by-label">
								Ordina per
							</InputLabel>
							<Select
								labelId="ordina-per"
								id="order-by-select"
								value={this.state.orderBy}
								onChange={(e) => {
									this.handleChangeSelectedOrderBy(
										e.target.value as string
									)
								}}
							>
								<MenuItem value="nome">Nome report</MenuItem>
								<MenuItem value="creazione">
									Data creazione
								</MenuItem>
								<MenuItem value="registrazione">
									Data registrazione
								</MenuItem>
							</Select>
						</FormControl>
					</div>
					<div>
						{this.props.state.reports.error
							? this.props.state.reports.error
							: ""}
						<Grid container spacing={3}>
							{this.popolate()}
						</Grid>
					</div>
				</ThemeProvider>
			</div>
		)
	}

	handleChangeSelectedOrderBy(value: string) {
		this.setState({ orderBy: value })
	}

	sort(a: ReportInformation, b: ReportInformation) {
		switch (this.state.orderBy) {
			case "nome":
			default:
				return a.name < b.name ? 1 : b.name < a.name ? -1 : 0
			case "creazione":
				return a.creationDate < b.creationDate
					? 1
					: b.creationDate < a.creationDate
					? -1
					: 0
			case "registrazione":
				return a.registrationDate < b.registrationDate
					? 1
					: b.registrationDate < a.registrationDate
					? -1
					: 0
		}
	}

	private popolate(): Array<JSX.Element> {
		let rows: Array<JSX.Element> = []
		if (this.props.state.reports.reports) {
			this.props.state.reports.reports
				.sort((a: ReportInformation, b: ReportInformation) =>
					this.sort(a, b)
				)
				.map((report: ReportInformation) => {
					rows.push(
						<Grid key={report.name} className="grid">
							<Paper className="paper">
								<ListItem className="listItem">
									<ListItemIcon>
										<InsertDriveFileIcon />
									</ListItemIcon>
									<ListItemText className="usernameLayout">
										<Button className="pencil">
											{report.name}
										</Button>
									</ListItemText>
								</ListItem>
							</Paper>
						</Grid>
					)
				})
		}
		return rows
	}
}

const mapStateToProps = (state: any) => {
	return {
		state: {
			reports: state.reports,
		},
	}
}

const mapDispatchToProps = (dispatch: Function) => {
	return {
		dispatch: {
			getReports: () => {
				dispatch(reportActionsResolve.getReports())
			},
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsComponent)
