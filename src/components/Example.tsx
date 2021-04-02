import { Component } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../reducers/rootReducer'
import { increment } from '../actions/exampleActions'
import { login, logout } from '../actions/loginActions'

// const counter = useSelector((state: RootState) => state.counter);
// const logged = useSelector((state: RootState) => state.logged);
// const dispatch = useDispatch();

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
        <h1>Counter: {this.counter}</h1>
        {this.isLogged ? <h1>Logged</h1> : <h1>Not logged</h1>}
        <button onClick={() => this.dispatch(increment())}>
          Aumenta
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
