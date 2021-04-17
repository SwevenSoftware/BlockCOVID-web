/* react */
import { Component } from "react";
/* redux */
import { connect } from 'react-redux';
import { login } from '../actions/loginActions'
/* material-ui */
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
/* styles */
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme';
import "../styles.css";

interface LoginProps {
  loginState: any,
  loginDispatch: Function
}

interface LoginStates {
  usernameValue: string,
  passwordValue: string,
  isButtonDisabled: boolean
}

class LoginComponent extends Component<LoginProps, LoginStates> {
  constructor(props) {
    super(props);
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = {
      usernameValue: "",
      passwordValue: "",
      isButtonDisabled: true
    }
  }

  componentDidMount() {
    this.setButton()
  }

  /**
  * Enables button if there is input, else disables it
  * @params username and password
  * @returns
  */
  setButton(username: string = this.state.usernameValue, password: string = this.state.passwordValue) {
    if(username && password) {
      this.setState({isButtonDisabled: false})
    }
    else {
      this.setState({isButtonDisabled: true})
    }
  }

  /**
  * Sets local state and button
  * @params username
  * @returns
  */
  handleChangeUsername(username: string) {
    this.setState({usernameValue: username.trim()})
    this.setButton(username)
  }

  /**
  * Sets local state and button
  * @params password
  * @returns
  */
  handleChangePassword(password: string) {
    this.setState({passwordValue: password.trim()})
    this.setButton(this.state.usernameValue, password)
  }

  /**
  * If the button is clicked, tries to login
  * @params
  * @returns
  */
  handleClick() {
    this.tryLogin()
  }

  /**
  * If key "Enter" is pressed, tries to login
  * @params key pressed from the user
  * @returns
  */
  handleKeyPress(key: string) {
    if(key === "Enter" && !this.state.isButtonDisabled) {
      this.tryLogin()
    }
  }

  /**
  * @params
  * @returns
  */
  tryLogin() {
    this.props.loginDispatch({username: this.state.usernameValue, password: this.state.passwordValue})
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <form noValidate autoComplete="off" className="container">
          <Card className="cardLogin">
            <CardHeader className="headerCard" title="Login"/>
            <CardContent>
              <div>
                <TextField
                  fullWidth
                  id="username"
                  type="email"
                  label="Username"
                  margin="normal"
                  error={this.props.loginState.error? true : false}
                  onChange={(e) => this.handleChangeUsername(e.target.value)}
                  onKeyPress={(e) => this.handleKeyPress(e.key)}
                />
                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  margin="normal"
                  error={this.props.loginState.error? true : false}
                  helperText={this.props.loginState.error? this.props.loginState.error : ""}
                  onChange={(e) => this.handleChangePassword(e.target.value)}
                  onKeyPress={(e) => this.handleKeyPress(e.key)}
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
}

const mapStateToProps = (state) => {
  return {
    loginState: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginDispatch: (data) => {
      dispatch(login(data));
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginComponent)
