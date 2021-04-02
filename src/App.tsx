import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider } from '@material-ui/styles';
import './styles.css';
import Login from './components/Login';
import Example from './components/Example';
// import Reservations from './Reservation';
// import CardGrid from './CardGrid';
// import Accounts from './Accounts';
// import GeneralLayout from './GeneralLayout';

import { useSelector, useDispatch, connect } from 'react-redux'
import { RootState } from './reducers/rootReducer'

const App: React.FC = () => {
  const state = useSelector((state: RootState) => state)
  console.log(state);

  const mapStateExample = (state) => ({ counter: state.counter, isLogged: state.login.isLogged })
  const ConnectedExample = connect(mapStateExample)(Example);

/*
<Route path='/reservations' exact component={Reservations}/>
<Route path='/desk' exact component={CardGrid}/>
<Route path='/accounts' exact component={Accounts}/>
<Route path='/login' exact component={Login}/>
*/

  return (
    <div className="App">
        <BrowserRouter>
        <Switch>
          <Route path='/esempio' exact component={ConnectedExample}/>
          <Route path='/login' exact component={Login}/>
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
      </div> */
