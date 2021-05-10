import React, { useState, useEffect } from 'react';
import { Theme, ThemeProvider } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import GeneralLayout from './GeneralLayout';
import Token from './Token';

import { theme } from './theme';
import { useDispatch } from 'react-redux'

const LoginForm = () => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helpText, setHelpText] = useState('');
    const [isError, setIsError] = useState(false);

    const cardTitle = "Login";
    const loginBtnText = "Log In";

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
    }

    const handleLogin = () => {
        console.log(JSON.stringify({
            username,
            password
        }));

        const config = { headers: { "Content-Type": "application/json" } };

        axios.post("/api/login",
            JSON.stringify({ username, password }),
            config
        )
            .then((res) => { /* user exists */
                let isAdmin = false;
                for (let i in res.data.authorities) {
                    if (res.data.authorities == "ADMIN") {
                        isAdmin = true;
                    }
                }
                if (isAdmin) { /* user has admin authorities, authorized login attempt */
                    successLogin();
                    Token.setId(res.data.token.id);
                    Token.setExpDate(res.data.token.expiryDate);
                    Token.setUsername(res.data.token.username);
                    location.href = "/reservations";
                }
                else { /* unauthorized login attempt */
                    failLogin("Accesso non autorizzato. Si prega di contattare l'amministratore");
                }
            }).catch((err) => { /* user not logged in, user may not exists */
                switch (err.response.status) {
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
        <ThemeProvider theme={theme}>
            <form className="container" noValidate autoComplete="off">
                <Card className="cardLogin">
                    <CardHeader className="headerCard" title={cardTitle} />
                    <CardContent>
                        <div>
                            <TextField
                                error={isError}
                                fullWidth
                                id="username"
                                type="email"
                                label="Username"
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
                            color="primary"
                            className="loginBtn"
                            onClick={handleLogin}
                            disabled={isButtonDisabled}>
                            {loginBtnText}
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </ThemeProvider>
    );
}

const Login = () => {
    return (<LoginForm />);
    // return (
    //   GeneralLayout(<LoginForm />)
    // );
}

export default Login
