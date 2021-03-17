import React, { RefObject, useEffect, createRef, ReactNode, Component } from 'react'
import ReactDOM from 'react-dom'
import PersonIcon from '@material-ui/icons/Person'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'

import './styles.css'
import GeneralLayout from './GeneralLayout'
import Report from './Report'
import Token from './Token'
import { Rowing } from '@material-ui/icons'
import SearchUsers from './SearchUsers'
import Pencil from './Pencil'
import Trash from './Trash'

interface Account {
  username: string,
  password: string,
  authorities: string[]
}

interface PaperAccount {
  username: string,
  authorities: string[],
  link_modify: string,
  link_delete: string
}

class AccountsForm extends Component {

  rows: Array<JSX.Element>

  constructor(props) {
    super(props)
    this.rows = new Array()
  }

  private addPaperAccount(account: PaperAccount) {
    this.rows.push(
      <Grid key={account.username} className="grid">
        <Paper className="paper">
          <ListItem className="listItem">
            <ListItemIcon>
              <PersonIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary={account.username} className="text"/>
            <Pencil/>
            <Trash/>
          </ListItem>
        </Paper>
      </Grid>
    )
  }

  private retrieveAccounts() {

    const config = {
      data: {},
      headers: {
        "Content-Type": "application/json",
        "Authorization": Token.getId()
      }
    }

    axios.get("/api/admin/users", config)
    .then((res) => {
      console.log(Token.getId());
      for (let i in res.data._embedded.userList) {
        const newAccount = {
          username: res.data._embedded.userList[i].username,
          authorities: res.data._embedded.userList[i].authorities,
          link_modify: res.data._embedded.userList[i]._links.modify_user.href,
          link_delete: ""
        }

        this.addPaperAccount(newAccount)
      }

      this.forceUpdate()
    }).catch((err) => {
      console.log(err)
      if(err.response.status == 401) { }
      else { }
    });
  }

  componentDidMount() {
    this.retrieveAccounts()
  }

  render() {

    return (
      <div>
        <Grid container spacing={3}>
            {this.rows}
        </Grid>
      </div>
    )
  }
}

const Accounts = () => {

  if (!Token.getId())
    location.href = "/login"

  return (
    GeneralLayout(
      <div>
        <SearchUsers />
        <AccountsForm />
      </div>
    )
  )
}

export default Accounts
