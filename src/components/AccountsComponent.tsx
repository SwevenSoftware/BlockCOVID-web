/* react */
import React, { Component } from "react"
/* redux */
import { connect } from "react-redux"
import accountActionsResolver from "../actions/accountsActions"
/* material-ui */
import PersonIcon from "@material-ui/icons/Person"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import PeopleIcon from "@material-ui/icons/People"
import SecurityIcon from "@material-ui/icons/Security"
import WorkIcon from "@material-ui/icons/Work"
import BathtubIcon from "@material-ui/icons/Bathtub"
/* styles */
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "../theme"
/* others */
import ModifyAccount from "./ModifyAccountComponent"
import NewAccount from "./NewAccountComponent"
import DeleteAccount from "./DeleteAccountComponent"
import CalendarViewComponent from "./CalendarViewComponent"

interface AccountProps {
	state: any
	dispatch: any
}

interface AccountStates {}

class AccountComponent extends Component<AccountProps, AccountStates> {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.dispatch.getAccounts()
	}

	render() {
		return (
			<div className="marginAccounts">
				<ThemeProvider theme={theme}>
					<div className="addAccountButton">
						<NewAccount />
					</div>
					<div className="counter">
						<ListItem>
							<h3 className="titleAccounts">Accounts:</h3>
							<ListItemIcon className="spacing">
								<PeopleIcon className="people" />
								<Typography className="number">
									{
										this.props.state.accounts.counter
											?.accounts
									}
								</Typography>
							</ListItemIcon>
							<ListItemIcon className="spacing">
								<SecurityIcon className="shield" />
								<Typography className="number">
									{this.props.state.accounts.counter?.admins}
								</Typography>
							</ListItemIcon>
							<ListItemIcon className="spacing">
								<WorkIcon className="bag" />
								<Typography className="number">
									{this.props.state.accounts.counter?.users}
								</Typography>
							</ListItemIcon>
							<ListItemIcon className="spacing">
								<BathtubIcon className="cleaner" />
								<Typography className="number">
									{
										this.props.state.accounts.counter
											?.cleaners
									}
								</Typography>
							</ListItemIcon>
						</ListItem>
					</div>
					<div>
						{this.props.state.accounts.error
							? this.props.state.accounts.error
							: ""}
						<Grid container spacing={3}>
							{this.popolate()}
						</Grid>
					</div>
				</ThemeProvider>
			</div>
		)
	}

	/**
	 * Provides the HTML code to display the accounts
	 * @params
	 * @returns An array of HTML code to display each account
	 */
	private popolate(): Array<JSX.Element> {
		let rows: Array<JSX.Element> = new Array()
		if (this.props.state.accounts.users) {
			this.props.state.accounts.users
				.sort((a, b) =>
					a.username > b.username
						? 1
						: b.username > a.username
						? -1
						: 0
				)
				.map((user) => {
					rows.push(
						<Grid key={user.username} className="grid">
							<Paper className="paper">
								<ListItem className="listItem">
									<ListItemIcon>
										<PersonIcon fontSize="large" />
									</ListItemIcon>
									<CalendarViewComponent
										data={{
											user: {
												username: user.username,
											},
										}}
										/* primary={user.username}
										className="usernameLayout" */
									/>
									<ModifyAccount
										data={{
											user: {
												username: user.username,
												authorities: user.authorities,
												link: user._links.modify_user
													.href,
											},
										}}
									/>
									<DeleteAccount
										mode="accounts"
										data={{
											user: {
												username: user.username,
												authorities: user.authorities,
												link: user._links.delete_user
													.href,
											},
										}}
									/>
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
			accounts: state.accounts,
		},
	}
}

const mapDispatchToProps = (dispatch: Function) => {
	return {
		dispatch: {
			getAccounts: () => {
				dispatch(accountActionsResolver.getAccounts())
			},
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountComponent)
