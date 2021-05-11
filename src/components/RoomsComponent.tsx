/* react */
import React, { Component } from 'react'
/* redux */
import { connect } from 'react-redux'
/* material-ui */
import PersonIcon from '@material-ui/icons/Person'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
/* styles */
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../theme'
import '../styles.css'
/* others */
import NewRoomComponent from './NewRoomComponent'

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
        // TODO: dispatch getRooms()
    }

    render() {
        return (
            <div className="marginAccounts"> {/* TODO: change className */}
                <ThemeProvider theme={theme}>
                    <div className="addAccountButton"> {/* TODO: change className */}
                        <NewRoomComponent/>
                    </div>
                    <div>
                        <Grid container spacing={3}>
                            {this.popolate()}
                        </Grid>
                    </div>
                </ThemeProvider>
            </div>
        )
    }

    /**
    * Provides the HTML code to display the rooms
    * @params
    * @returns An array of HTML code to display each room
    */
    private popolate(): Array<JSX.Element> {
        let rows: Array<JSX.Element> = new Array()
        // TODO: remove 'rows.push()' once dynamic code is functional
        rows.push(
            <Grid key={"staticRoom"} className="grid">
                <Paper className="paper"> {/* TODO: change style, might change className as well */}
                    <ListItem className="listItem">
                        <ListItemIcon>
                            <MeetingRoomIcon fontSize="large" />
                        </ListItemIcon>
                        {/* TODO: clicking on the room name should open the modification modal */}
                        <ListItemText primary="static room" className="usernameLayout" />
                        {/* TODO: add static room information such as opening times, closing time, week days and sizes */}
                        {/* TODO: replace button with proper component */}
                        <Button>
                            Canc
            </Button>
                    </ListItem>
                </Paper>
            </Grid>
        )
        // TODO: dynamic code, correctly fetch rooms information
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
            // TODO: add roomsReducer to rootReducer
            // rooms: state.rooms
        }
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        dispatch: {
            getRooms: (tokenID: string) => {
                // TODO: add getRooms() to roomsActions
                // dispatch(getRooms(tokenID))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomsComponent)