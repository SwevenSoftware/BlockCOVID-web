import React from 'react'
/* material-ui/core */
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
/* material-ui/icons */
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DnsIcon from '@material-ui/icons/Dns';
import Token from './Token'
import { format, parseISO, compareAsc } from 'date-fns';
import { SnackbarProvider } from 'notistack';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      background: "#689f38"
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
  }),
);

export default function GeneralLayout(mainElement : JSX.Element) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    Token.remove();
    location.href = "/login";
  }

  const manageToken = () => {
    let str = Token.getExpDate();
    if(str) {
      // 1 if the first date si after the second
      // -1 if the first date is before the second
      // 0 if dates are equal
      if( compareAsc(new Date(), parseISO(str)) > -1 ) {
        logout();
      }
    }
  }

  manageToken();
  //console.log(mainElement.props.children.type.name);
  return (

    <div className="root">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx("menuButton", {
              ["hide"]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Pannello Amministratore
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className="toolbar">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />

        <List>
          <ListItem
            button key="Reservations"
            component={Link}
            to="/reservations"
            disabled={ mainElement.type.name ?
               ["LoginForm", "ReservationForm"].includes(mainElement.type.name) :
               /* (mainElement.props.children.type.name ?
                 ["LoginForm", "ReservationForm"].includes(mainElement.props.children.type.name) : */
                  mainElement.props.children.map((cella) => cella.type.name).includes("ReservationsForm", "LoginForm")  }
          >
            <ListItemIcon className="iconColor"><DnsIcon /></ListItemIcon>
            <ListItemText primary="Reservations" />
          </ListItem>

          <ListItem
            button key="Accounts"
            component={Link}
            to="/accounts"
            disabled={mainElement.type.name ?
              ["LoginForm", "SnackbarProvider"].includes(mainElement.type.name) :
               mainElement.props.children.map((cella) => cella.type.name).includes("SnackbarProvider", "LoginForm") }
          >
            <ListItemIcon className="iconColor"><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItem>

          <ListItem
            button key="Desks"
            component={Link}
            to="/rooms"
            disabled={mainElement.type.name ?
               ["LoginForm", "CardGridApp"].includes(mainElement.type.name) :
                mainElement.props.children.map((cella) => cella.type.name).includes("CardGridApp", "LoginForm") }
          >
            <ListItemIcon className="iconColor"><EventSeatIcon /></ListItemIcon>
            <ListItemText primary="Desks" />
          </ListItem>
          {/* <ListItem button key="Rooms">
            <ListItemIcon><MeetingRoomIcon /></ListItemIcon>
            <ListItemText primary="Rooms" />
          </ListItem> */}
        </List>
        <Divider />
        <List>
          { Token.getId() ?
            <ListItem button key="Logout" onClick={logout}>
              <ListItemIcon className="iconColor"><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
            :
            <ListItem button key="Login" onClick={() => location.href="/login"}>
              <ListItemIcon className="iconColor"><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          }
        </List>
      </Drawer>
      <main className="content">
        <div className="toolbar" />
        {mainElement}
      </main>
    </div>
  );
}
