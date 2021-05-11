/* react */
import React, { Component } from "react"

/* redux */
import { connect } from 'react-redux'
// import { getAccounts } from '../actions/accountsActions' //will be updated

/* material-ui */
import PersonIcon from '@material-ui/icons/Person'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

/* styles */
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../theme'
import '../styles.css'
/* others */
// import Pencil from './PencilComponent'
// import NewUser from './NewUserComponent'     //will be updated
// import Trash from './TrashComponent'


interface RoomsProps {
    state: any
    dispatch: any
}

interface RoomsStates {
}

class RoomsComponent extends Component<RoomsProps, RoomsStates> {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className="marginAccounts">
                <ThemeProvider theme={theme}>
                    <div className="addAccountButton">
                        <Button>CREA</Button>
                    </div>

                    <div>
                        {/* {this.props.state.accounts.error ?
                            this.props.state.accounts.error : ""} */}
                        <Grid container spacing={3}>
                            {this.popolate()}
                        </Grid>
                    </div>
                </ThemeProvider>
            </div>
        )
    }

    /**
    * Provides the HTML code to display the accounts
    * @params
    * @returns An array of HTML code to display each account
    */
    private popolate(): Array<JSX.Element> {
        let rows: Array<JSX.Element> = new Array()
        /* if (this.props.state.accounts.users) {
            this.props.state.accounts.users
                .sort((a, b) => (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0))
                .map((user) => {
                    rows.push(
                        <Grid key={user.username} className="grid">
                            <Paper className="paper">
                                <ListItem className="listItem">
                                    <ListItemIcon>
                                        <PersonIcon fontSize="large" />
                                    </ListItemIcon>
                                    <ListItemText primary={user.username} className="usernameLayout" />
                                    <Pencil
                                        data={{
                                            user: {
                                                username: user.username,
                                                authorities: user.authorities,
                                                link: user._links.modify_user.href
                                            }
                                        }}
                                    />
                                    <Trash
                                        mode="accounts"
                                        data={{
                                            user: {
                                                username: user.username,
                                                authorities: user.authorities,
                                                link: user._links.delete_user.href
                                            }
                                        }}
                                    />
                                </ListItem>
                            </Paper>
                        </Grid>
                    )
                })
        } */
        return rows
    }
}

const mapStateToProps = (state: any) => {
    return {
        state: {
            login: state.login,
            //rooms: state.rooms
        }
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        dispatch: {
            getRooms: (tokenID: string) => {
               //dispatch(getRooms(tokenID))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomsComponent)
