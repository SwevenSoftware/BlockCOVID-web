import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import GeneralLayout from './GeneralLayout';
import Token from './Token';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: "#319e77",

      "&:hover" : {
        background: "#31729e"
      }
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

const LoginForm = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helpText, setHelpText] = useState('');
  const [isError, setIsError] = useState(false);

  const cardTitle = "Login";
  const loginBtnText = "Login";

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [username, password]);

  const successLogin = () => {
    setHelpText('');
    setIsError(false);
  }

  const failLogin = (message: string) => {
    setHelpText(message);
    setIsError(true);
    console.log("Fail error: ", isError)
  }

  const handleLogin = () => {
    console.log(JSON.stringify({
      username,
      password
    }));

    const config = {headers: { "Content-Type": "application/json"}};

    axios.post("/api/login",
      JSON.stringify({username, password}),
      config
    )
      .then((res) => { /* user exists */

        const configAux = {
          data: {}, /* data must be set or else headers.Content-Type will be ignored */
          headers: {
            "Content-Type": "application/json",
            "Authorization": res.data.id,
          }
        }

        axios.get("/api/admin/users", configAux)
          .then( () => { /* user has admin authorities */
            successLogin();
            Token.setId(res.data.id);
            Token.setExpDate(res.data.expiryDate);
            Token.setUsername(res.data.username);
            location.href = "/reservations";
          })
          .catch((err) => { /* user has not admin authorities */
            switch(err.response.status) {
              case 401: case 403:
                /* 401, 403: unauthorized login attempt */
                failLogin("Accesso non autorizzato. Si prega di contattare l'amministratore");
              break;
            }
          })
      }).catch((err) => { /* user not logged in or does not exists */
        switch(err.response.status) {
          case 400: case 500:
            /* 400: incorrect password
               500: incorrect username or user does not exists */
            failLogin("Username o password scorretta. Riprova");
          break;
        }
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key == "Enter") {
      isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      setUsername(event.target.value);
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      setPassword(event.target.value);
    }
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className="headerCard" title={cardTitle} />
        <CardContent>
          <div>
            <TextField
              error={isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={helpText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              onClick={handleLogin}
              disabled={isButtonDisabled}>
              {loginBtnText}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

const Login = () => {
  return (
    GeneralLayout(<LoginForm />)
  );
}

export default Login
