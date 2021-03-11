import React, { RefObject, useEffect, createRef, ReactNode, Component } from 'react';
import ReactDOM from 'react-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

import './styles.css'
import GeneralLayout from './GeneralLayout'
import Report from './Report'
import Token from './Token'
import { Rowing } from '@material-ui/icons';

interface Account {
  id: number,
  user: string,
  surname_name: string,
  password: string,
}

class AccountsForm extends Component {

  rows: Array<JSX.Element>;

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
        <TableCell align="center">{row.surname_name}</TableCell>
        <TableCell align="center">{row.password}</TableCell>
      </TableRow>
    )
  }

  private retrieveAccounts() {
    const config = { headers: { "Authorization": Token.get() } };
    axios.post("/api", {}, config).then((res) => {
      for (var id in res.data) {
        const data = res.data[id]
        const newAccount = {
          id: data.id,
          user: data.user,
          surname_name: data.surname_name,
          password: data.password
        };
        this.addTableRow(newAccount);
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
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead className="headerCard">
              <TableRow>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Surname - Name</TableCell>
                <TableCell align="center">Password</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.rows}</TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  };
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
  );
}

export default Accounts;
