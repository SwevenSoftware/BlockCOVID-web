import { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { loginUP as login, logout } from '../actions/loginActions'
import { initialState as initialLogin} from '../reducers/loginReducer'

class Login extends Component {
  login: typeof initialLogin;
  dispatch: any;
  state = {
    usernameValue: "",
    passwordValue: "",
    isButtonDisabled: true,
    hasError: false
  }

  constructor(props) {
    super(props);
    this.login = props.login;
    this.dispatch = props.dispatch;
  }

  componentDidMount() {
    if(this.login.errorMessage) {
      this.setState({hasError: true});
    }
    else{
      this.setState({hasError: false});
    }
  }

  render() {
    return (
      <div>
        <form noValidate autoComplete="off">
          <Card>
            <CardHeader className="headerCard" title="Titolo"/>
            <CardContent>
              <div>
                <TextField
                  fullWidth
                  id="username"
                  type="email"
                  label="Username"
                  margin="normal"
                  error={this.state.hasError}
                  value={this.state.usernameValue}
                  onChange={(e) => {
                    this.setState({usernameValue: e.target.value.trim()});
                    if(e.target.value.trim() && this.state.passwordValue.trim()) {
                      this.setState({isButtonDisabled: false})
                    }
                    else this.setState({isButtonDisabled: true})
                  }}
                />
                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  margin="normal"
                  error={this.state.hasError}
                  helperText={this.login.errorMessage}
                  value={this.state.passwordValue}
                  onChange={(e) => {
                    this.setState({passwordValue: e.target.value.trim()})
                    if(this.state.usernameValue.trim() && e.target.value.trim()) {
                      this.setState({isButtonDisabled: false})
                    }
                    else this.setState({isButtonDisabled: true})
                  }}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  disabled={this.state.isButtonDisabled}
                  onClick={() => this.dispatch(login(this.state.usernameValue, this.state.passwordValue))}
              > Qualcosa
              </Button>
            </CardActions>
          </Card>
        </form>
        { console.log(this.login)}
      </div>
    );
  }
}

export default Login;
