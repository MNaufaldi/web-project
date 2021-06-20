import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducers from './reducers'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
// import { store } from './store';

const state = {
  userId: null,
  isSignedIn: false,
  userDetails: {
    batch: null,
    classIds: null
  }
}
const saveState = (state) => {
  try {
    const serializesState = JSON.stringify(state);
    localStorage.setItem("state", serializesState);
  } catch (err) {
    console.log(err);
  }
};
// const persistedState = localStorage.getItem('isSignedIn') ? JSON.parse(localStorage.getItem('isSignedIn')) : null
const persistedState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : undefined;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, persistedState, composeEnhancers(applyMiddleware(reduxThunk)));
store.subscribe(()=>{
  saveState(store.getState());
})
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

