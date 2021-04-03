import { Component } from "react";
import { useSelector, connect } from 'react-redux'
import { RootState } from '../reducers/rootReducer'
import { increment, decrement } from '../actions/exampleActions'
import { login, logout } from '../actions/loginActions'

class Example extends Component {
  counter: number;
  isLogged: boolean;
  dispatch: any;

  constructor(props) {
    super(props);
    this.counter = props.counter;
    this.isLogged = props.isLogged;
    this.dispatch = props.dispatch;
  }

  render() {
    return (
      <div className="Example">
        <h1>Contatore: {this.counter}</h1>
        {this.isLogged ? <h1>Accesso effettuato</h1> : <h1>Accesso non effettuato</h1>}
        <button onClick={() => this.dispatch(increment())}>
          Aumenta
        </button>
        <button onClick={() => this.dispatch(decrement())}>
          Diminuisci
        </button>
        <button onClick={() => this.dispatch(login())}>
          Login
        </button>
        <button onClick={() => this.dispatch(logout())}>
          Logout
        </button>
      </div>
    );
  }
};

export default Example;
