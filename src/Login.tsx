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

  const failLogin = (message : string) => {
    setHelpText(message);
    setIsError(true);
    console.log("Fail error: ", isError)
  }
/*            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA         */
  const createTokenProvider = () => {

    /* variabile per salvare il token e far si che il token non si perda al refresh */
    let _token: {accessToken: string, refreshToken: string } = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') ||  '') || null; 

    /* estrae la scadenza del token o u nnull */
    const getExpirationDate = (jwtToken?: string): number | null => {
      if (!jwtToken) {
        return null;
      }

      const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

      return jwt && jwt.exp && jwt.exp*1000 || null;
    };

    const isExpired = (exp?: number) => {
      if (!exp) {
        return false 
      }

      return Date.now() > exp;
    }

    const getToken = async () => {
      if (!_token) {
        return null;
      }

      if (isExpired(getExpirationDate(_token.accessToken))){
        const updateToken = await fetch('/update-token', {
          method: 'POST',
          body: _token.refreshToken
        })
        
        .then(r => r.json());

        setToken(updateToken);
      }

      return _token && _token.accessToken;
    };

    const isLoggedIn = () => {
      return !!_token;
    };

    /* chiamato dopo ogni cambio di token */

    /* qui posso passare anche il token se  si ritiene più sicurop di un boolean */
    let observers: Array<(isLogged: boolean) => void> = [];

    const subscribe = (observer: (isLogged: boolean) => void) => {
      observers.push(observer);
    };

    const unsubscribe = (observer: (isLogged: boolean) => void) => {
      observers = observers.filter(_observer => _observer !== observer);
    }

    /* prende il flag e lo invia a tutti gli observers */
    const notify = () => {
      const isLogged  = isLoggedIn();
      observers.forEach(observer => observer(isLogged));
    }

    /* serve per salvare il token in locale o svuotare tutto se è pieno e mandare la notifica dell'avvenuto */

    const seToken = (token: typeof _token) => {
      if (token) {
        localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
      } else {
        localStorage.removeItem('REACT_TOKEN_AUTH');
      }

      _token = token;
      notify();
    }

    return {
      getToken,
      isLoggedIn,
      setToken,
      subscribe,
      unsubscribe,
    };
  };
  /*       AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA        */
  const handleLogin = () => {
    console.log(JSON.stringify({
      username,
      password
    }));
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const config = {headers: { 'content-type': 'multipart/form-data'}};

    axios.post("/api/login", formData, config)
    .then((res) => {
      successLogin();
      Token.set(res.data);
      location.href = "/reservations";
    }).catch((err) => {
      console.log(err)
      if(err.response.status == 401) {
        failLogin('Incorrect username or password')
      } else {
        failLogin('Server error')
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
