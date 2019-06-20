import React from 'react';
import renderer from 'react-test-renderer';

import MovieTabs from './movie-tabs.jsx';
import reviews from '../../mocks/reviews.js';
import film from '../../mocks/film.js';

it(`MovieTabs correctly renders`, () => {
  const tree = renderer
    .create(<MovieTabs
      reviews={reviews}
      activeItem={`Overview`}
      onChange={jest.fn()}
      movie={film}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
