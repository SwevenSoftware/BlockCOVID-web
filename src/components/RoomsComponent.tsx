/* react */
import React, { Component } from 'react'
/* redux */
import { connect } from 'react-redux'
import roomActionsResolver from '../actions/roomsActions'
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
/* others */
import NewRoom from './NewRoomComponent'
import ModifyRoom from './ModifyRoomComponent'
import DeleteRoom from './DeleteRoomComponent'

import GridProva from '../Grid'

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
        this.props.dispatch.getRooms({ fromTimestamp: '', toTimestamp: '' })
    }

    render() {
        console.log(this.props.state.rooms)
        return (
            <div className="marginAccounts"> {/* TODO: change className */}
                <ThemeProvider theme={theme}>
                    <div className="addAccountButton"> {/* TODO: change className */}
                        <NewRoom />
                    </div>
                    <div>
                        {this.props.state.rooms.error ?
                            this.props.state.rooms.error : ""}
                            <Button
                                onClick={() => {
                                    let gridProva: GridProva = new GridProva(2,10)
                                    gridProva.addDesk(1,1)
                                    gridProva.addDesk(1,2)
                                    gridProva.addDesk(1,4)
                                    gridProva.addDesk(1,4)
                                    {/* gridProva.addDesk(1,4)
                                    gridProva.addDesk(1,5) */}

                                    console.log(gridProva.searchByPos(1,2))
                                    }}>
                                Search By Pos
                            </Button>
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
        let rows: Array<JSX.Element> = []
        if (this.props.state.rooms.rooms) {
            let weekDays: string[] = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"]
            this.props.state.rooms.rooms
                .sort((a, b) => (a.room.name > b.room.name) ? 1 : ((b.room.name > a.room.name) ? -1 : 0))
                .map((roomList) => {
                    let openingDays: string[] =
                        roomList.room.openingDays.map((day) => {
                            switch (day) {
                                case "MONDAY": return weekDays[0]
                                case "TUESDAY": return weekDays[1]
                                case "WEDNESDAY": return weekDays[2]
                                case "THURSDAY": return weekDays[3]
                                case "FRIDAY": return weekDays[4]
                                case "SATURDAY": return weekDays[5]
                                case "SUNDAY": return weekDays[6]
                            }
                        }).sort((a, b) => weekDays.indexOf(a) > weekDays.indexOf(b) ? 1 : ((weekDays.indexOf(b) > weekDays.indexOf(a) ? -1 : 0)))
                    rows.push(
                        <Grid key={roomList.room.name} className="grid">
                            <Paper className="paper"> {/* TODO: change style, might change className as well */}
                                <ListItem className="listItem">
                                    <ListItemIcon>
                                        <MeetingRoomIcon
                                            fontSize="large"
                                            style={{ color: roomList.room.closed ? 'red' : 'green' }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText className="usernameLayout">
                                        <ModifyRoom data={{
                                            room: {
                                                name: roomList.room.name,
                                                closed: roomList.room.closed,
                                                openingTime: roomList.room.openingTime.split(":")[0] + ":" + roomList.room.openingTime.split(":")[1],
                                                closingTime: roomList.room.closingTime.split(":")[0] + ":" + roomList.room.closingTime.split(":")[1],
                                                openingDays: openingDays,
                                                height: roomList.room.height,
                                                width: roomList.room.width
                                            },
                                            desks: roomList.desks
                                        }} />
                                    </ListItemText>
                                    <DeleteRoom data={{
                                        room: {
                                            name: roomList.room.name,
                                            openingTime: roomList.room.openingTime.split(":")[0] + ":" + roomList.room.openingTime.split(":")[1],
                                            closingTime: roomList.room.closingTime.split(":")[0] + ":" + roomList.room.closingTime.split(":")[1],
                                            openingDays: openingDays,
                                            height: roomList.room.height,
                                            width: roomList.room.width,
                                        },
                                        desks: roomList.desks
                                    }} />
                                </ListItem>
                            </Paper>
                        </Grid>
                    )
                })
        }
        return rows
    }
}

const mapStateToProps = (state: any) => {
    return {
        state: {
            rooms: state.rooms
        }
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        dispatch: {
            getRooms: (data: { fromTimestamp: string, toTimestamp: string }) => {
                dispatch(roomActionsResolver.getRooms(data))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomsComponent)
