import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from './reducers/rootReducer';
import Login from './components/LoginComponent'
import Account from './components/AccountComponent'

const App: React.FC = () => {
  // const state = useSelector((state: RootState) => state) // WARNING: do not remove or else UI will not update
  // console.log(state)
  /* subscribing components to the store */

  return(
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={Login}/>
          <Route path='/accounts' exact component={Account}/>
          <Redirect path='*' to='/login'/>
        </Switch>
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
