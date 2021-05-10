import React, { RefObject, useEffect, createRef, ReactNode, Component } from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom'
/* material-ui/core */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/* other files */
import GeneralLayout from './GeneralLayout';
import Report from './Report';
import './styles.css';
import Token from './Token';


interface Reservation {
    id: number,
    room: string,
    desk: number,
    date: string,
    from: string,
    to: string,
    user: string
}

class ReservationsForm extends Component {
    rows: Array<JSX.Element>;

    constructor(props) {
        super(props)
        this.rows = new Array()
    }

    private addTableRow(row: Reservation) {
        this.rows.push(
            <TableRow key={row.id}>
                <TableCell component="th" scope="row" align="left">
                    {row.id}
                </TableCell>
                <TableCell align="center">{row.room}</TableCell>
                <TableCell align="center">{row.desk}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.from}</TableCell>
                <TableCell align="center">{row.to}</TableCell>
                <TableCell align="center">{row.user}</TableCell>
            </TableRow>
        )
    }

    private retrieveReservations() {
        const config = { headers: { "Authorization": Token.getId() } };
        axios.post("/api/admin/reservations", {}, config).then((res) => {
            for (var id in res.data) {
                const data = res.data[id]
                const newReservation = {
                    id: data.id,
                    room: data.nameRoom,
                    desk: data.idDesk,
                    date: data.date,
                    from: data.from,
                    to: data.to,
                    user: data.user
                };
                this.addTableRow(newReservation);
            }
            this.forceUpdate()
        })
    }

    componentDidMount() {
        this.retrieveReservations()
    }

    render() {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead className="headerCard">
                            <TableRow >
                                <TableCell align="left" ><span className="tableTitles">Reservation ID</span></TableCell>
                                <TableCell align="center"><span className="tableTitles">Room</span></TableCell>
                                <TableCell align="center"><span className="tableTitles">Desk</span></TableCell>
                                <TableCell align="center"><span className="tableTitles">Date</span></TableCell>
                                <TableCell align="center"><span className="tableTitles">From</span></TableCell>
                                <TableCell align="center"><span className="tableTitles">To</span></TableCell>
                                <TableCell align="center"><span className="tableTitles">Username</span></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.rows}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    };
}

const Reservations = () => {

    if (!Token.getId())
        location.href = "/login"
    return (<div></div>)
    // return (
    //   GeneralLayout(
    //     <div>
    //       <ReservationsForm/>
    //       <Report />
    //     </div>
    //   )
    // );
}

export default Reservations;
