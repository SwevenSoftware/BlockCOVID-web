import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configStore from './configureStore';
import App from "./App";

const rootElement = document.getElementById("react");

ReactDOM.render(
  <StrictMode>
    <Provider store={configStore().store}>
      <PersistGate loading={null} persistor={configStore().persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
  rootElement
);
