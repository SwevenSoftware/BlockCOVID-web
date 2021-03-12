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

import {Modal} from './Modal'

interface Account {
  id: number,
  user: string,
}


class AccountsForm extends Component {

  rows: Array<JSX.Element>

  isModalOpen: boolean;

  constructor(props) {
    super(props)
    this.rows = new Array()
    this.isModalOpen = false;
    this.toggleModal = this.toggleModal.bind(this);
  }

  private toggleModal() {
    console.log('isModalOpen', this.isModalOpen);
    this.isModalOpen = !this.isModalOpen;
    this.forceUpdate();
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
          <Grid className="grid">
            <Paper className="paper">
              <ListItem className="listItem">
                <ListItemIcon>
                  <PersonIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Username1" className= "text"/> {/* TODO: get and visualize real username */}
                
                <IconButton className="pencil" onClick={this.toggleModal}>
                  <CreateIcon className="icon"/>
                </IconButton>

                <Modal
                  title={'Kebabbo'}
                  isOpen={this.isModalOpen}
                  onClose={this.toggleModal}  
                >
                  Con o sensa scipola amico?
                </Modal>

                <IconButton className="trash" onClick={this.toggleModal}>
                  <DeleteIcon className="icon"/>
                </IconButton>

                {/* <Modal
                  title={'Seguro de eliminare tuto?'}
                  isOpen={this.isModalOpen}
                  onClose={this.toggleModal}  
                >
                  Varda ca te te penti...
                </Modal> */}

              </ListItem>
            </Paper>
          </Grid> {/* WARNING: from here we replicate the same grid item */}
          <Grid className="grid">
            <Paper className="paper">
              <ListItem className="listItem">
                <ListItemIcon>
                  <PersonIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Username2"/> {/* TODO: get and visualize real username */}
                <IconButton className="pencil">
                  <CreateIcon/>
                </IconButton>
                <IconButton className="trash">
                  <DeleteIcon/>
                </IconButton>
              </ListItem>
            </Paper>
          </Grid>
          <Grid className="grid">
            <Paper className="paper">
              <ListItem className="listItem">
                <ListItemIcon>
                  <PersonIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Username3"/> {/* TODO: get and visualize real username */}
                <IconButton className="pencil">
                  <CreateIcon/>
                </IconButton>
                <IconButton className="trash">
                  <DeleteIcon/>
                </IconButton>
              </ListItem>
            </Paper>
          </Grid>
          <Grid className="grid">
            <Paper className="paper">
              <ListItem className="listItem">
                <ListItemIcon>
                  <PersonIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Username4"/> {/* TODO: get and visualize real username */}
                <IconButton className="pencil">
                  <CreateIcon/>
                </IconButton>
                <IconButton className="trash">
                  <DeleteIcon/>
                </IconButton>
              </ListItem>
            </Paper>
          </Grid>
          <Grid className="grid">
            <Paper className="paper">
              <ListItem className="listItem">
                <ListItemIcon>
                  <PersonIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Username"/> {/* TODO: get and visualize real username */}
                <IconButton className="pencil">
                  <CreateIcon/>
                </IconButton>
                <IconButton className="trash">
                  <DeleteIcon/>
                </IconButton>
              </ListItem>
            </Paper>
          </Grid>
          <Grid className="grid">
            <Paper className="paper">
              <ListItem className="listItem">
                <ListItemIcon>
                  <PersonIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Username"/> {/* TODO: get and visualize real username */}
                <IconButton className="pencil">
                  <CreateIcon/>
                </IconButton>
                <IconButton className="trash">
                  <DeleteIcon/>
                </IconButton>
              </ListItem>
            </Paper>
          </Grid>
          <Grid className="grid">
            <Paper className="paper">
              <ListItem className="listItem">
                <ListItemIcon>
                  <PersonIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Username"/> {/* TODO: get and visualize real username */}
                <IconButton className="pencil">
                  <CreateIcon/>
                </IconButton>
                <IconButton className="trash">
                  <DeleteIcon/>
                </IconButton>
              </ListItem>
            </Paper>
          </Grid>
          <Grid className="grid">
            <Paper className="paper">
              <ListItem className="listItem">
                <ListItemIcon>
                  <PersonIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Username"/> {/* TODO: get and visualize real username */}
                <IconButton className="pencil">
                  <CreateIcon/>
                </IconButton>
                <IconButton className="trash">
                  <DeleteIcon/>
                </IconButton>
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
        <SearchUsers />
        <AccountsForm />
      </div>
    )
  )
}

export default Accounts
