import React from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {createAPI} from '../../api.js';

import reducer from '../../reducers/index.js';
import App from './app.jsx';

const api = createAPI();

it(`App correctly renders`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)))}>
          <MemoryRouter
            initialEntries = {[`/`]}
          >
            <App />
          </MemoryRouter>
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
