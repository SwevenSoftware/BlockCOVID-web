/* react */
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootState } from './reducers/rootReducer'
/* others */
import GeneralLayout from './GeneralLayout'
import Login from './components/LoginComponent'
import Accounts from './components/AccountsComponent'
import Rooms from './Rooms'
import './styles.css'
const App: React.FC = () => {

    const token = useSelector((state: RootState) => state.login.token)

    return (
        <BrowserRouter>
            {GeneralLayout()}
            <div className="marginAccounts">
                {token ?
                    <Switch>
                        <Route path='/accounts' exact component={Accounts} />
                        <Route path='/rooms' exact component= {Rooms} />
                        <Redirect path='*' to='/accounts' />
                    </Switch>
                    :
                    <Switch>
                        <Route path='/login' exact component={Login} />
                        <Redirect path='*' to='/login' />
                    </Switch>
                }
            </div>
        </BrowserRouter>
    );
}

export default App;

/* <div className="App">
        <BrowserRouter>
          <GeneralLayout/>
          <Switch>
            <Route path='/accounts' exact component={Accounts}/>
            <Route path='/login' exact component={Login}/>
            <Redirect from='/' to='/reservations'/>
          </Switch>
        </BrowserRouter>
        </div>
*/
/*
  <Route path='/reservations' exact component={Reservations}/>
  <Route path='/desk' exact component={CardGrid}/>
  <Route path='/accounts' exact component={Accounts}/>
  <Route path='/login' exact component={Login}/>
*/
