import React from 'react';
import renderer from 'react-test-renderer';

import MovieTabOverview from './movie-tab-overview.jsx';
import film from '../../mocks/film.js';

it(`MovieTabOverview correctly renders`, () => {
  const {
    director,
    starring,
    rating,
    scoresCount,
    description,
    ratingLevel
  } = film;

  const tree = renderer
    .create(<MovieTabOverview
      director={director}
      starring={starring}
      rating={rating}
      scoresCount={scoresCount}
      description={description}
      ratingLevel={ratingLevel}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
