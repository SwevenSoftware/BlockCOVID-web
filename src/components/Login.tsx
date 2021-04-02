import { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

class Login extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // qui disattivo il bottone se non ce input
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
                />
                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  margin="normal"
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                  variant="contained"
                  size="large"
                  color= "primary"
              > Qualcosa
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    );
  }
}

export default Login;
