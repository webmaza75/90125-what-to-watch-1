import React from 'react';
import renderer from 'react-test-renderer';

import ReviewBlock from './review-block.jsx';
import reviews from '../../mocks/reviews.js';

it(`ReviewBlock correctly renders`, () => {
  const tree = renderer
    .create(<ReviewBlock
      list={reviews}
      idx={`left`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
