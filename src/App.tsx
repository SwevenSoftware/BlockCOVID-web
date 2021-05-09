/* react */
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// import { RootState } from './reducers/rootReducer';
import Login from './components/LoginComponent'
import Accounts from './components/AccountsComponent'
/* others */
import { SnackbarProvider } from 'notistack'

const App: React.FC = () => {
    // const state = useSelector((state: RootState) => state) // WARNING: do not remove or else UI will not update
    // console.log(state)
    /* subscribing components to the store */

    return (
        <div className="App">
            <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' exact component={Login} />
                        <Route path='/accounts' exact component={Accounts} />
                        <Redirect path='*' to='/login' />
                    </Switch>
                </BrowserRouter>
            </SnackbarProvider>
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
