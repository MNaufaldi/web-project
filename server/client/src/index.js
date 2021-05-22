import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reducers from './reducers'

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

