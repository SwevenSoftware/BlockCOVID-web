/* react */
import { Component } from "react"
/* redux */
import { connect } from 'react-redux'
import { getAccounts } from '../actions/accountsActions'
/* material-ui */
import PersonIcon from '@material-ui/icons/Person'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import PeopleIcon from '@material-ui/icons/People'
import SecurityIcon from '@material-ui/icons/Security'
import WorkIcon from '@material-ui/icons/Work'
import BathtubIcon from '@material-ui/icons/Bathtub'
// import Button from '@material-ui/core/Button';
/* styles */
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../theme'
import '../styles.css'
/* others */
// import Pencil from '../Pencil'
import Trash from './TrashComponent'
// import NewUser from '../NewUser'

interface AccountProps {
  state: any
  dispatch: any
 }

interface AccountStates {
  counter: any
}

class AccountComponent extends Component<AccountProps, AccountStates> {
  constructor(props) {
    super(props)
    this.state = {
      counter: {
        accounts: 0,
        admins: 0,
        users: 0,
        cleaners: 0
      }
    }
  }

  componentDidMount() {
    this.props.dispatch.getAccounts(this.props.state.login.token.id)
    this.setCounter()
  }

  render() {
    console.log(this.props) // WARNING: testing purposes
    return (
      <ThemeProvider theme={theme}>
        <div className="counter">
          <ListItem>
            <h3>Accounts:</h3>
            <ListItemIcon
              className="spacing">
              <PeopleIcon className="people"/>
              <Typography className="number">
                {this.state.counter.accounts}
              </Typography>
            </ListItemIcon>
            <ListItemIcon
              className="spacing">
              <SecurityIcon className="shield"/>
              <Typography className="number">
                {this.state.counter.admins}
              </Typography>
            </ListItemIcon>
            <ListItemIcon
              className="spacing">
              <WorkIcon className="bag"/>
              <Typography className="number">
                {this.state.counter.users}
              </Typography>
            </ListItemIcon>
            <ListItemIcon
              className="spacing">
              <BathtubIcon className="cleaner"/>
              <Typography className="number">
                {this.state.counter.cleaners}
              </Typography>
            </ListItemIcon>
          </ListItem>
        </div>
        <div>
          {this.props.state.accounts.error?
            this.props.state.accounts.error: ""}
          <Grid container spacing={3}>
            {this.popolate()}
          </Grid>
        </div>
      </ThemeProvider>
     )
   }

  /**
  * Provides the HTML code to display the accounts
  * @params
  * @returns An array of HTML code to display each account
  */
  private popolate(): Array<JSX.Element> {
    let rows: Array<JSX.Element> = new Array()
      if(this.props.state.accounts.users) {
        this.props.state.accounts.users
          .sort((a, b) => (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0))
          .map((user) => {
            rows.push(
              <Grid key={user.username} className="grid">
                <Paper className="paper">
                  <ListItem className="listItem">
                    <ListItemIcon>
                      <PersonIcon fontSize="large"/>
                    </ListItemIcon>
                    <ListItemText primary={user.username} className="usernameLayout"/>
                    <PersonIcon fontSize="large"/>
                    <Trash
                      mode="accounts"
                      data={
                        {user: { username: user.username, authorities: "value"}}
                      }
                    />
                  </ListItem>
                </Paper>
              </Grid>
            )
        })
      }
    return rows
  }

  /**
  * Counts how many accounts there are and how many accounts per each type
  * @params
  * @returns
  */
  private setCounter(): void {
    if(this.props.state.accounts.users) {
      this.setState({
        counter: {
          accounts: this.props.state.accounts.users.length,
          admins: this.props.state.accounts.users.reduce((acc, cur) => cur.authorities.includes("ADMIN") ? ++acc : acc, 0),
          users: this.props.state.accounts.users.reduce((acc, cur) => cur.authorities.includes("USER") ? ++acc : acc, 0),
          cleaners: this.props.state.accounts.users.reduce((acc, cur) => cur.authorities.includes("CLEANER") ? ++acc : acc, 0)
        }
      })
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    state: {
      login: state.login,
      accounts: state.accounts
    }
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    dispatch: {
      getAccounts: (tokenID: string) => {
        dispatch(getAccounts(tokenID))
      }
    }
  }
}

export default connect(
     mapStateToProps,
     mapDispatchToProps
  )(AccountComponent)

// class AccountComponent extends Component<AccountProps, AccountStates> {
//   rows: Array<JSX.Element>
//   aux: PaperAccount[]
//   counter: any
//
//   constructor(props) {
//     super(props)
//     this.rows = new Array()
//     this.aux = new Array()
//     this.counter = {accounts: 0, admins: 0, users: 0, cleaners: 0}
//   }
//
//   /**
//   * @params
//   * @returns
//   */
//   componentDidMount() {
//     console.log(Token.getId()) // WARNING: for testing purposes
//     this.viewAccounts()
//   }
//
//   /**
//   * @params
//   * @returns
//   */
//   render() {
//     return (
//       <ThemeProvider theme={theme}>
//         <div className="counter">
//           <ListItem>
//             <h3>Accounts:</h3>
//             <ListItemIcon
//               className="spacing">
//               <PeopleIcon className="people"/>
//               <Typography className="number">
//                 {this.counter.accounts}
//               </Typography>
//             </ListItemIcon>
//             <ListItemIcon
//               className="spacing">
//               <SecurityIcon className="shield"/>
//               <Typography className="number">
//                 {this.counter.admins}
//               </Typography>
//             </ListItemIcon>
//             <ListItemIcon
//               className="spacing">
//               <WorkIcon className="bag"/>
//               <Typography className="number">
//                 {this.counter.users}
//               </Typography>
//             </ListItemIcon>
//             <ListItemIcon
//               className="spacing">
//               <BathtubIcon className="cleaner"/>
//               <Typography className="number">
//                 {this.counter.cleaners}
//               </Typography>
//             </ListItemIcon>
//           </ListItem>
//         </div>
//         <Grid container spacing={3}>
//           {this.rows}
//         </Grid>
//       </ThemeProvider>
//      )
//    }
//
//    private setCounter() {
//      this.counter = {
//        accounts: this.aux.length,
//        admins: this.aux.reduce((acc, cur) => cur.authorities.includes("ADMIN") ? ++acc : acc, 0),
//        users: this.aux.reduce((acc, cur) => cur.authorities.includes("USER") ? ++acc : acc, 0),
//        cleaners: this.aux.reduce((acc, cur) => cur.authorities.includes("CLEANER") ? ++acc : acc, 0)
//      }
//    }
//
//    /**
//    * Push into this.rows the HTML code to display an account
//    * @params PaperAccount which contains all the information needed
//    * @returns
//    */
//    private addPaperAccount(account: PaperAccount) {
//      this.rows.push(
//        <Grid key={account.username} className="grid">
//          <Paper className="paper">
//            <ListItem className="listItem">
//              <ListItemIcon>
//                <PersonIcon fontSize="large"/>
//              </ListItemIcon>
//              <ListItemText primary={account.username} className="usernameLayout"/>
//                <Pencil {...account}/>
//                <Trash {...account}/>
//            </ListItem>
//          </Paper>
//        </Grid>
//      )
//    }
//
//    /**
//    * Visualize all existing accounts and set counter
//    * @params
//    * @returns
//    */
//    private viewAccounts() {
//      this.getAccounts()
//        .then(data => {
//          data._embedded.userList.map((cella) => {
//            const newAccount: PaperAccount = {
//              username: cella.username,
//              authorities: cella.authorities,
//              link_modify: cella._links.modify_user.href,
//              link_delete: cella._links.delete_user.href
//            }
//            this.aux.push(newAccount)
//          })
//
//          this.aux.sort((a, b) => (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0))
//          this.aux.map((cella) => this.addPaperAccount(cella))
//
//          this.setCounter() /* set counter */
//          //this.forceUpdate()
//        }).catch(err => {
//            console.log("An error has occured in viewAccounts(): ", err)
//        })
//    }
//
//    /**
//    * Query the API to retrieve all existing accounts
//    * @params
//    * @returns Set of data
//    */
//    private getAccounts() {
//      const config = {
//        data: {}, /* data must be set or else headers.Content-Type will be ignored */
//        headers: {
//          "Content-Type": "application/json",
//          "Authorization": Token.getId(),
//        }
//      }
//
//      const promise = axios.get("/api/admin/users", config)
//      const dataPromise = promise.then((res) =>  res.data)
//      return dataPromise
//    }
// }


  // const Accounts = () => {
  //
  // return (
  //      <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
  //
  //          <div className="addAccountButton">
  //            <NewUser/>
  //
  //          </div>
  //
  //      </SnackbarProvider>
  //    )
  // }
  // export default Accounts
