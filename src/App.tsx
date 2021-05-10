/* react */
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootState } from './reducers/rootReducer'
/* others */
import GeneralLayout from './GeneralLayout'
import Login from './components/LoginComponent'
import Accounts from './components/AccountsComponent'
import './styles.css'
const App: React.FC = () => {

    const token = useSelector((state: RootState) => state.login.token)

    return (
        <div className="App">
            <BrowserRouter>
                {GeneralLayout(token)}
                {token ?
                    <Switch>
                        <Route path='/accounts' exact component={Accounts} />
                        <Redirect path='*' to='/accounts' />
                    </Switch>
                    :
                    <Switch>
                        <Route path='/login' exact component={Login} />
                        <Redirect path='*' to='/login' />
                    </Switch>
                }
            </BrowserRouter>
        </div>
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
