import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from './reducers/rootReducer';
import { ConnectedLogin }from './connectedComponents';

const App: React.FC = () => {
  // const state = useSelector((state: RootState) => state) // WARNING: do not remove or else UI will not update
  // console.log(state)
  /* subscribing components to the store */

  return(
    <div className="App">
      <BrowserRouter>
        <Switch>
          
          <Route path='/login' exact component={ConnectedLogin}/>
          
          <Redirect from='/' to='/login'/>
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
