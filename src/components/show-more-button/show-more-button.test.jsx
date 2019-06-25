import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import ShowMoreButton from './show-more-button.jsx';
import reducer from '../../reducers/reducer.js';

it(`ShowMoreButton correctly renders`, () => {
  const showMoreButton = renderer
    .create(<Provider store={createStore(reducer)}>
      <ShowMoreButton />
    </Provider>)
    .toJSON();

  expect(showMoreButton).toMatchSnapshot();
});
