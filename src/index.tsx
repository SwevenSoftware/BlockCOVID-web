import { StrictMode } from "react";
import ReactDOM from "react-dom";
import React from 'react';

import App from "./App";

import {createStore} from 'redux';
import {Provider} from 'react-redux'
import rootReducer from './reducers/index';

const store = createStore(rootReducer)
console.log(store.getState())
const rootElement = document.getElementById("react");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
