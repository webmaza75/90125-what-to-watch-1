import React from 'react';
import renderer from 'react-test-renderer';

import MovieTabReviews from './movie-tab-reviews.jsx';
import reviews from '../../mocks/reviews.js';

it(`MovieTabReviews correctly renders`, () => {
  const tree = renderer
    .create(<MovieTabReviews
      reviews={reviews}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
