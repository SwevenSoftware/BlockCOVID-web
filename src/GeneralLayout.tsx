/* react */
import React from "react"
import { Link } from "react-router-dom"
/* redux */
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "./reducers/rootReducer"
import loginActionsResolver from "./actions/loginActions"
/* material-ui */
import {
	createStyles,
	makeStyles,
	useTheme,
	Theme,
} from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import EventSeatIcon from "@material-ui/icons/EventSeat"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
/* icons */
import PeopleIcon from "@material-ui/icons/People"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import DnsIcon from "@material-ui/icons/Dns"
import AssignmentIcon from "@material-ui/icons/Assignment"
/* others */
import clsx from "clsx"

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			background: "#689f38",
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: "nowrap",
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: "hidden",
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9) + 1,
			},
		},
	})
)

export default function GeneralLayout() {
	const classes = useStyles()
	const theme = useTheme()
	const [open, setOpen] = React.useState(false)

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const token = useSelector((state: RootState) => state.login.token)

	const dispatch = useDispatch()
	const logout = () => {
		dispatch(loginActionsResolver.logout())
	}

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
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem
						button
						key="Accounts"
						component={Link}
						to="/accounts"
					>
						<ListItemIcon className="iconColor">
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText primary="Accounts" />
					</ListItem>

					<ListItem button key="Desks" component={Link} to="/rooms">
						<ListItemIcon className="iconColor">
							<EventSeatIcon />
						</ListItemIcon>
						<ListItemText primary="Desks" />
					</ListItem>

					<ListItem
						button
						key="Reports"
						component={Link}
						to="/reports"
					>
						<ListItemIcon className="iconColor">
							<AssignmentIcon />
						</ListItemIcon>
						<ListItemText primary="Reports" />
					</ListItem>
				</List>
				<Divider />
				<List>
					{token ? (
						<ListItem button key="Logout" onClick={logout}>
							<ListItemIcon className="iconColor">
								<ExitToAppIcon />
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</ListItem>
					) : (
						""
					)}
				</List>
			</Drawer>
		</div>
	)
}
