import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider } from '@material-ui/styles';
import './styles.css';
import Login from './Login';
import Reservations from './Reservation';
import CardGrid from './CardGrid';
import Accounts from './Accounts';
import GeneralLayout from './GeneralLayout';

import {useSelector, useDispatch} from 'react-redux'
import {increment, login} from './actions/index'
import {RootState} from './reducers/index'


const App: React.FC = () => {

  const counter = useSelector((state: RootState) => state.counter);
  const logged = useSelector((state: RootState) => state.logged);
  const dispatch = useDispatch()
  console.log(useSelector((state: RootState)=> state.logged));

/*
<Route path='/reservations' exact component={Reservations}/>
<Route path='/desk' exact component={CardGrid}/>
<Route path='/accounts' exact component={Accounts}/>
<Route path='/login' exact component={Login}/>
*/

  return (
      <div className="App">
        <BrowserRouter>
          <GeneralLayout/>
          <Switch>
            <Route path='/accounts' exact component={Accounts}/>
            <Route path='/login' exact component={Login}/>
            <Redirect from='/' to='/reservations'/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;



      {/* <div>
        <h1>Counter: {counter}</h1>
        <button onClick={() => dispatch(increment())}>aumenta</button>
        <button onClick={() => dispatch(login())}>login</button>
        {logged ? <h1>loggato</h1> : <h1>nope</h1>}
      </div> */}
