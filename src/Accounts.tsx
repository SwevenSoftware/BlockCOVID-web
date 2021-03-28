import React, { RefObject, useEffect, createRef, ReactNode, Component } from 'react';
import ReactDOM from 'react-dom';
import PersonIcon from '@material-ui/icons/Person';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

import './styles.css';
import GeneralLayout from './GeneralLayout';
import Report from './Report';
import Token from './Token';
import { Rowing } from '@material-ui/icons';
import SearchUsers from './SearchUsers';
import Pencil from './Pencil';
import Trash from './Trash';

import NewUser from './NewUser'

import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

import Typography from '@material-ui/core/Typography';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme';
import PeopleIcon from '@material-ui/icons/People';
import SecurityIcon from '@material-ui/icons/Security';
import WorkIcon from '@material-ui/icons/Work';
import BathtubIcon from '@material-ui/icons/Bathtub';


interface Account {
  username: string,
  password: string,
  authorities: string[]
};

interface PaperAccount {
  username: string,
  authorities: string[],
  link_modify: string,
  link_delete: string
};

class AccountsForm extends Component {

  rows: Array<JSX.Element>
  aux: PaperAccount[]
  counter: any

  /**
  * Initialize this.rows
  */
  constructor(props) {
    super(props)
    this.rows = new Array()
    this.aux = new Array()
    this.counter = {accounts: 0, admins: 0, users: 0, cleaners: 0};
  }

  /**
  * @params
  * @returns
  */
  componentDidMount() {
    console.log(Token.getId()); // WARNING: for testing purposes
    this.viewAccounts();
  }

  /**
  * @params
  * @returns
  */
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="counter">
          <ListItem>
            <h3>Accounts:</h3>
            <ListItemIcon
              className="spacing">
              <PeopleIcon className="people"/>
              <Typography className="number">
                {this.counter.accounts}
              </Typography>
            </ListItemIcon>
            <ListItemIcon
              className="spacing">
              <SecurityIcon className="shield"/>
              <Typography className="number">
                {this.counter.admins}
              </Typography>
            </ListItemIcon>
            <ListItemIcon
              className="spacing">
              <WorkIcon className="bag"/>
              <Typography className="number">
                {this.counter.users}
              </Typography>
            </ListItemIcon>
            <ListItemIcon
              className="spacing">
              <BathtubIcon className="cleaner"/>
              <Typography className="number">
                {this.counter.cleaners}
              </Typography>
            </ListItemIcon>
          </ListItem>
        </div>
        <Grid container spacing={3}>
          {this.rows}
        </Grid>
      </ThemeProvider>

    )
  }

  private setCounter() {
    this.counter = {
      accounts: this.aux.length,
      admins: this.aux.reduce((acc, cur) => cur.authorities.includes("ADMIN") ? ++acc : acc, 0),
      users: this.aux.reduce((acc, cur) => cur.authorities.includes("USER") ? ++acc : acc, 0),
      cleaners: this.aux.reduce((acc, cur) => cur.authorities.includes("CLEANER") ? ++acc : acc, 0)
    };

  }

  /**
  * Push into this.rows the HTML code to display an account
  * @params PaperAccount which contains all the information needed
  * @returns
  */
  private addPaperAccount(account: PaperAccount) {
    this.rows.push(
      <Grid key={account.username} className="grid">
        <Paper className="paper">
          <ListItem className="listItem">
            <ListItemIcon>
              <PersonIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary={account.username} className="usernameLayout"/>
              <Pencil {...account}/>
              <Trash {...account}/>
          </ListItem>
        </Paper>
      </Grid>
    )
  }

  /**
  * Visualize all existing accounts and set counter
  * @params
  * @returns
  */
  private viewAccounts() {
    this.getAccounts()
      .then(data => {
        data._embedded.userList.map((cella) => {
          const newAccount: PaperAccount = {
            username: cella.username,
            authorities: cella.authorities,
            link_modify: cella._links.modify_user.href,
            link_delete: cella._links.delete_user.href
          }
          this.aux.push(newAccount);
        });

        this.aux.sort((a, b) => (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0));
        this.aux.map((cella) => this.addPaperAccount(cella));

        this.setCounter(); /* set counter */
        this.forceUpdate();
      }).catch(err => {
          console.log("An error has occured in viewAccounts(): ", err);
      });
  }

  /**
  * Query the API to retrieve all existing accounts
  * @params
  * @returns Set of data
  */
  private getAccounts() {
    const config = {
      data: {}, /* data must be set or else headers.Content-Type will be ignored */
      headers: {
        "Content-Type": "application/json",
        "Authorization": Token.getId(),
      }
    }

    const promise = axios.get("/api/admin/users", config);
    const dataPromise = promise.then((res) =>  res.data);
    return dataPromise;
  }
};

const Accounts = () => {
  if (!Token.getId()) {
    location.href = "/login";
  }


  return (
    GeneralLayout(
      <div>
          <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
            <div className="addAccountButton">
              <NewUser/>
            </div>
            <AccountsForm/>
          </SnackbarProvider>
      </div>
    )
  )
};

export default Accounts
