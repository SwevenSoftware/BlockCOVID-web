import React, { RefObject, useEffect, createRef, ReactNode, Component } from 'react'
import ReactDOM from 'react-dom'
import PersonIcon from '@material-ui/icons/Person'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import './styles.css'
import GeneralLayout from './GeneralLayout'
import Report from './Report'
import Token from './Token'
import { Rowing } from '@material-ui/icons'

interface Account {
  id: number,
  user: string,
}

class AccountsForm extends Component {

  rows: Array<JSX.Element>

  constructor(props) {
    super(props)
    this.rows = new Array()
  }

  private addTableRow(row: Account) {
    this.rows.push(
      <TableRow key={row.id}>
        <TableCell component="th" scope="row" align="left">
          {row.id}
        </TableCell>

        <TableCell align="center">{row.user}</TableCell>
      </TableRow>
    )
  }

  private retrieveAccounts() {
    const config = { headers: { "Authorization": Token.get() } }
    axios.post("/api", {}, config).then((res) => {
      for (var id in res.data) {
        const data = res.data[id]
        const newAccount = {
          id: data.id,
          user: data.user,
        }
        this.addTableRow(newAccount)
      }
      this.forceUpdate()
    })
  }

  componentDidMount() {
    this.retrieveAccounts()
  }

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper className="paper">
              <ListItem className="align">
                <ListItemIcon><PersonIcon className="person" /></ListItemIcon>
                <ListItemText primary="Username" />
                <IconButton><CreateIcon className="pencil" /></IconButton>
                <IconButton><DeleteIcon className="trash" /></IconButton>
              </ListItem>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className="paper">
              <ListItem className="align">
                <ListItemIcon><PersonIcon className="person" /></ListItemIcon>
                <ListItemText primary="Username" />
                <IconButton><CreateIcon className="pencil" /></IconButton>
                <IconButton><DeleteIcon className="trash" /></IconButton>
              </ListItem>
            </Paper>
          </Grid><Grid item xs={3}>
            <Paper className="paper">
              <ListItem className="align">
                <ListItemIcon><PersonIcon className="person" /></ListItemIcon>
                <ListItemText primary="Username" />
                <IconButton><CreateIcon className="pencil" /></IconButton>
                <IconButton><DeleteIcon className="trash" /></IconButton>
              </ListItem>
            </Paper>
          </Grid><Grid item xs={3}>
            <Paper className="paper">
              <ListItem className="align">
                <ListItemIcon><PersonIcon className="person" /></ListItemIcon>
                <ListItemText primary="Username" />
                <IconButton><CreateIcon className="pencil" /></IconButton>
                <IconButton><DeleteIcon className="trash" /></IconButton>
              </ListItem>
            </Paper>
          </Grid><Grid item xs={3}>
            <Paper className="paper">
              <ListItem className="align">
                <ListItemIcon><PersonIcon className="person" /></ListItemIcon>
                <ListItemText primary="Username" />
                <IconButton><CreateIcon className="pencil" /></IconButton>
                <IconButton><DeleteIcon className="trash" /></IconButton>
              </ListItem>
            </Paper>
          </Grid><Grid item xs={3}>
            <Paper className="paper">
              <ListItem className="align">
                <ListItemIcon><PersonIcon className="person" /></ListItemIcon>
                <ListItemText primary="Username" />
                <IconButton><CreateIcon className="pencil" /></IconButton>
                <IconButton><DeleteIcon className="trash" /></IconButton>
              </ListItem>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className="paper">
              <ListItem className="align">
                <ListItemIcon><PersonIcon className="person" /></ListItemIcon>
                <ListItemText primary="Username" />
                <IconButton><CreateIcon className="pencil" /></IconButton>
                <IconButton><DeleteIcon className="trash" /></IconButton>
              </ListItem>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className="paper">
              <ListItem className="align">
                <ListItemIcon><PersonIcon className="person" /></ListItemIcon>
                <ListItemText primary="Username" />
                <IconButton><CreateIcon className="pencil" /></IconButton>
                <IconButton><DeleteIcon className="trash" /></IconButton>
              </ListItem>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const Accounts = () => {

  if (!Token.get())
    location.href = "/login"

  return (
    GeneralLayout(
      <div>
        <AccountsForm />
      </div>
    )
  )
}

export default Accounts
