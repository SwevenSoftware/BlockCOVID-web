/* react */
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "./reducers/rootReducer"
/* styles */
import "./styles.css"
/* others */
import GeneralLayout from "./GeneralLayout"
import Login from "./components/LoginComponent"
import Accounts from "./components/AccountsComponent"
import Rooms from "./components/RoomsComponent"
import Reports from "./components/ReportsComponent"

const App: React.FC = () => {
	const token = useSelector((state: RootState) => state.login.token)

	return (
		<BrowserRouter>
			<div className="scrollbar">
				{GeneralLayout()}
				<div className="marginAccounts">
					{token ? (
						<Switch>
							<Route
								path="/accounts"
								exact
								component={Accounts}
							/>
							<Route path="/rooms" exact component={Rooms} />
							<Route path="/reports" exact component={Reports} />
							<Redirect path="*" to="/accounts" />
						</Switch>
					) : (
						<Switch>
							<Route path="/login" exact component={Login} />
							<Redirect path="*" to="/login" />
						</Switch>
					)}
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
