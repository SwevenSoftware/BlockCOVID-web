/* react */
import { Component } from "react"
/* redux */
import { connect } from "react-redux"
import loginActionResolver from "../actions/loginActions"
/* material-ui */
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
/* styles */
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "../theme"

interface LoginProps {
	state: any
	dispatch: any
}

interface LoginStates {
	usernameValue: string
	passwordValue: string
	isButtonDisabled: boolean
}

class LoginComponent extends Component<LoginProps, LoginStates> {
	constructor(props) {
		super(props)
		this.handleChangeUsername = this.handleChangeUsername.bind(this)
		this.handleChangePassword = this.handleChangePassword.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
		this.state = {
			usernameValue: "",
			passwordValue: "",
			isButtonDisabled: true,
		}
	}

	componentDidMount() {
		this.setButton()
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<form noValidate autoComplete="off" className="container">
					<Card className="cardLogin">
						<CardHeader className="headerCard" title="Login" />
						<CardContent>
							<div>
								<TextField
									fullWidth
									id="username"
									type="email"
									label="Username"
									margin="normal"
									error={!!this.props.state.error}
									onChange={(e) =>
										this.handleChangeUsername(
											e.target.value
										)
									}
									onKeyPress={(e) =>
										this.handleKeyPress(e.key)
									}
								/>
								<TextField
									fullWidth
									id="password"
									type="password"
									label="Password"
									margin="normal"
									error={!!this.props.state.error}
									helperText={
										this.props.state.error
											? this.props.state.error
											: ""
									}
									onChange={(e) =>
										this.handleChangePassword(
											e.target.value
										)
									}
									onKeyPress={(e) =>
										this.handleKeyPress(e.key)
									}
								/>
							</div>
						</CardContent>
						<CardActions>
							<Button
								variant="contained"
								size="large"
								color="primary"
								className="loginBtn"
								disabled={this.state.isButtonDisabled}
								onClick={() => this.handleClick()}
							>
								Confirm
							</Button>
						</CardActions>
					</Card>
				</form>
			</ThemeProvider>
		)
	}

	/**
	 * Enables button if there is input or else disables it
	 * @params username and password
	 * @returns
	 */
	private setButton(
		username: string = this.state.usernameValue,
		password: string = this.state.passwordValue
	): void {
		if (username && password) {
			this.setState({ isButtonDisabled: false })
		} else {
			this.setState({ isButtonDisabled: true })
		}
	}

	/**
	 * Sets local state (username) and button
	 * @params username
	 * @returns
	 */
	private handleChangeUsername(username: string): void {
		this.setState({ usernameValue: username.trim() })
		this.setButton(username)
	}

	/**
	 * Sets local state (password) and button
	 * @params password
	 * @returns
	 */
	private handleChangePassword(password: string): void {
		this.setState({ passwordValue: password.trim() })
		this.setButton(this.state.usernameValue, password)
	}

	/**
	 * If key "Enter" is pressed, tries to login
	 * @params key pressed from the user
	 * @returns
	 */
	private handleKeyPress(key: string): void {
		if (key === "Enter" && !this.state.isButtonDisabled) {
			this.tryLogin()
		}
	}

	/**
	 * If the button is clicked, tries to login
	 * @params
	 * @returns
	 */
	private handleClick(): void {
		if (!this.state.isButtonDisabled) {
			this.tryLogin()
		}
	}

	/**
	 * @params
	 * @returns
	 */
	private tryLogin(): void {
		this.props.dispatch.login({
			username: this.state.usernameValue,
			password: this.state.passwordValue,
		})
	}
}

const mapStateToProps = (state) => {
	return {
		state: {
			error: state.login.error,
		},
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: {
			login: (data: { username: string; password: string }) => {
				dispatch(loginActionResolver.login(data))
			},
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
