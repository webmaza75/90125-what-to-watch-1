import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import App from './components/app/app.jsx';
import filmList from './mocks/films.js';
import reducer from './reducer.js';

const init = () => {
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  /* eslint-enable */
  ReactDom.render(
      <Provider store={store}>
        <App films={filmList} />
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
