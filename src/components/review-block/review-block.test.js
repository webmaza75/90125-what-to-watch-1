import React from 'react';
import renderer from 'react-test-renderer';

import ReviewBlock from './review-block.jsx';
import list from '../../mocks/list.js';

it(`ReviewBlock correctly renders`, () => {
  const tree = renderer
    .create(<ReviewBlock
      list={list}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
