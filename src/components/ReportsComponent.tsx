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
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import InfoIcon from "@material-ui/icons/Info"
/* styles */
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "../theme"
/* others */
import { ReportInformation } from "../Api/reportAPI"
import { Link, TextField, Tooltip, Typography } from "@material-ui/core"

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
			orderBy: "creazione",
		}
	}

	componentDidMount() {
		this.props.dispatch.getReports()
	}

	render() {
		return (
			<div className="marginAccounts">
				<ThemeProvider theme={theme}>
					<div className="addReportsButton">
						<ListItem>
							<ListItemIcon>
								<Button
									onClick={() => {
										this.props.dispatch.getUsage()
									}}
								>
									<NoteAddIcon className="bag" />
								</Button>
							</ListItemIcon>
							<ListItemIcon>
								<Button
									onClick={() => {
										this.props.dispatch.getCleaner()
									}}
								>
									<NoteAddIcon className="cleaner" />
								</Button>
							</ListItemIcon>
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
									<MenuItem value="creazione">
										Data creazione
									</MenuItem>
									<MenuItem value="registrazione">
										Data registrazione
									</MenuItem>
									<MenuItem value="nome">
										Nominativo report
									</MenuItem>
								</Select>
							</FormControl>
						</ListItem>
					</div>
					<div>
						{this.props.state.reports.error
							? this.props.state.reports.error
							: ""}
						<Grid container spacing={3}>
							{this.populate()}
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
		let property: string
		switch (this.state.orderBy) {
			case "nome":
			default:
				property = "name"
				break
			case "creazione":
				property = "creationDate"
				break
			case "registrazione":
				property = "registrationDate"
				break
		}
		return a[property] < b[property]
			? 1
			: b[property] < a[property]
			? -1
			: 0
	}

	private populate(): Array<JSX.Element> {
		let rows: Array<JSX.Element> = []
		if (this.props.state.reports.reports) {
			this.props.state.reports.reports
				.sort((a: ReportInformation, b: ReportInformation) =>
					this.sort(a, b)
				)
				.map((report: ReportInformation) => {
					let creationDate: Date = new Date(report.creationDate + "Z")
					let registrationDate: Date | null = null
					if (report.registrationDate) {
						registrationDate = new Date(
							report.registrationDate + "Z"
						)
					}

					rows.push(
						<Grid key={report.name} className="gridReports">
							<Paper className="paperReports">
								<ListItem className="listItemIcon">
									<ListItemIcon>
										<InsertDriveFileIcon
											className={
												report.name
													.toLowerCase()
													.split("_")
													.includes("usage")
													? "bag"
													: report.name
															.toLowerCase()
															.split("_")
															.includes("cleaner")
													? "cleaner"
													: ""
											}
										/>
									</ListItemIcon>
									<ListItemText>
										<div className="listItem">
											<Button
												style={{ fontSize: "13px" }}
												className="greenButton"
												onClick={() => {
													this.props.dispatch.getReport(
														{
															reportName:
																report.name,
														}
													)
												}}
											>
												{report.name
													.split("_")
													.join(" ")}
											</Button>
										</div>
										<Typography>
											{"Data di creazione: " +
												creationDate.toLocaleDateString() +
												" - " +
												creationDate.toLocaleTimeString(
													[],
													{
														hour: "2-digit",
														minute: "2-digit",
														second: "2-digit",
													}
												)}
										</Typography>
										<Typography>
											{"Data di registrazione: " +
												(registrationDate
													? registrationDate.toLocaleDateString() +
													  " - " +
													  registrationDate.toLocaleTimeString(
															[],
															{
																hour: "2-digit",
																minute: "2-digit",
																second: "2-digit",
															}
													  )
													: "null")}
										</Typography>
										<Typography>
											<div className="listItem">
												<Typography>
													{"Hash del documento: "}
													<Tooltip
														title="clicca per copiare"
														placement="right"
													>
														<Button
															color="primary"
															onClick={() =>
																navigator.clipboard.writeText(
																	report.hash
																)
															}
														>
															{this.short(
																report.hash
															)}
														</Button>
													</Tooltip>
												</Typography>
											</div>
										</Typography>
										<Typography>
											<div className="listItem">
												<Typography>
													{"Hash transazione: "}
													<Tooltip
														title="clicca per copiare"
														placement="right"
													>
														<Button
															color="primary"
															onClick={() =>
																navigator.clipboard.writeText(
																	report.transactionHash
																)
															}
														>
															{this.short(
																report.transactionHash
															)}
														</Button>
													</Tooltip>
												</Typography>
											</div>
										</Typography>
										<Typography>
											<div className="listItem">
												{report.transactionHash ? (
													<Link
														href={
															"https://etherscan.io/tx/" +
															report.transactionHash
														}
													>
														Vedi la transazione su
														etherscan
													</Link>
												) : (
													"Registrazione non ancora avvenuta"
												)}
											</div>
										</Typography>
									</ListItemText>
								</ListItem>
							</Paper>
						</Grid>
					)
				})
		}
		return rows
	}

	private short(hash: string): string {
		if (hash) {
			return (
				hash.substr(0, 3) +
				"..." +
				hash.substring(hash.length - 3, hash.length)
			)
		}
		return ""
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
			getReport: (data: { reportName: string }) => {
				dispatch(reportActionsResolve.getReport(data))
			},
			getUsage: (data: {
				fromTimestamp: string
				toTimestamp: string
			}) => {
				dispatch(reportActionsResolve.getUsage(data))
			},
			getCleaner: () => {
				dispatch(reportActionsResolve.getCleaner())
			},
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsComponent)
