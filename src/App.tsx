import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider } from '@material-ui/styles';
import './styles.css';
import Login from './Login';
import Reservations from './Reservation';
import CardGrid from './CardGrid';
import Rooms from './Rooms';
import Accounts from './Accounts';


const App: React.FC = () => {

  return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/login' exact component={Login}/>
            <Route path='/reservations' exact component={Reservations}/>
            <Route path='/rooms' exact component={Rooms}/>
            <Route path='/accounts' exact component={Accounts}/>
            <Redirect from='/' to='/reservations'/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
