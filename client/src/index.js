import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './scss/index.module.scss';
import App from './App';
import UserStore from "./store/UserStore";
import CarStore from "./store/CarStore";

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{     //set Context
      user: new UserStore(),    //create UserStore
      car: new CarStore()      //create CarStore
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('jadeauto')
);

