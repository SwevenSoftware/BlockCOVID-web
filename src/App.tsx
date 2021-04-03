import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import { RootState } from './reducers/rootReducer';
import Login from './components/Login';
import Example from './components/Example';

const App: React.FC = () => {
  const state = useSelector((state: RootState) => state) // WARNING: do not remove or else UI will not update

  /* subscribing components to the store */
  const ConnectedExample =
    connect((state: RootState) => ({
      counter: state.counter,
      isLogged: state.login.isLogged
    }))(Example);

  return(
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/esempio' exact component={ConnectedExample}/>
          <Route path='/login' exact component={Login}/>
          <Redirect from='/' to='/esempio'/>
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
