import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {Router} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';

import App from './components/app/app.jsx';
import reducer from './reducers/reducer.js';
import {Operation} from './reducers/films/films.js';
import {createAPI} from './api.js';
import history from './history.js';

const init = () => {
  const api = createAPI();
  let composeEnhancer;

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    composeEnhancer = compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    composeEnhancer = applyMiddleware(thunk.withExtraArgument(api));
  }

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      composeEnhancer
  );
  /* eslint-enable */

  store.dispatch(Operation.loadFilms());

  ReactDom.render(
      <Provider store={store}>
        <Router history={history}>
          <NotificationContainer />
          <App />
        </Router>
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
