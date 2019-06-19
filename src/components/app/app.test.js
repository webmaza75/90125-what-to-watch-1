import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import reducer from '../../reducers/index.js';

it(`App correctly renders`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <MemoryRouter
            initialEntries = {[`/`]}>
          </MemoryRouter>
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
