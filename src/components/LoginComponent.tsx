import { Component } from "react";
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import { login } from '../actions/loginActions'
import { theme } from '../theme';
import "../styles.css";

interface loginProps {
  loginFun: Function
}

interface loginStates {
  usernameValue: string,
  passwordValue: string
}

class Login extends Component<loginProps, loginStates> {
  /* login: typeof initialLogin;
  dispatch: any;
  state = {
    usernameValue: "",
    passwordValue: "",
    isButtonDisabled: true,
    hasError: false
  } */

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.state = {
      usernameValue: "",
      passwordValue: ""
    }
    /* this.login = props.login;
    this.dispatch = props.dispatch; */
  }

  componentDidMount() {
    /* if(this.login.errorMessage) {
      this.setState({hasError: true});
    }
    else{
      this.setState({hasError: false});
    } */
  }

  handleChangeUsername(username: string) {
    this.setState({usernameValue: username})
  }

  handleChangePassword(password: string) {
    this.setState({passwordValue: password})
  }

  handleClick(){
    this.props.loginFun({username: this.state.usernameValue, password: this.state.passwordValue})
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
                  /* error={this.state.hasError}
                  value={this.state.usernameValue} */
                  onChange={(e) => this.handleChangeUsername(e.target.value)}
                  /* onChange={(e) => {
                    this.setState({usernameValue: e.target.value.trim()});
                    if(e.target.value.trim() && this.state.passwordValue.trim()) {
                      this.setState({isButtonDisabled: false})
                    }
                    else this.setState({isButtonDisabled: true})
                  }} */
                />
                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  margin="normal"
                  onChange={(e) => this.handleChangePassword(e.target.value)}
                  /* error={this.state.hasError}
                  helperText={this.login.errorMessage}
                  value={this.state.passwordValue}
                  onChange={(e) => {
                    this.setState({passwordValue: e.target.value.trim()})
                    if(this.state.usernameValue.trim() && e.target.value.trim()) {
                      this.setState({isButtonDisabled: false})
                    }
                    else this.setState({isButtonDisabled: true})
                  }} */
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  /* disabled={this.state.isButtonDisabled} */
                  className="loginBtn"
                  onClick={() => {

                    this.handleClick()
                  }/* this.dispatch(login(this.state.usernameValue, this.state.passwordValue)) */}
              > Confirm
              </Button>
            </CardActions>
          </Card>
        </form>
        { console.log(this.props)}
      </ThemeProvider>
    );
  }
}

// import { info } from 'node:console';

// const mapStateToProps = (dispatch) => {
//   return {
//     login: state => {
//       state.login;
//     }
//   };
// };

/* export const ConnectedLogin =
  connect((state: RootState) => ({
    login: state.login
  }))(Login); */

const mapDispatchToProps = (dispatch) => {
  return {
    loginFun: data => {
      dispatch(login(data));
    }
  };
};

export default connect(
    null,
    mapDispatchToProps
  )(Login);
