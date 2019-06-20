import React from 'react';
import renderer from 'react-test-renderer';

import MovieTabDetails from './movie-tab-details.jsx';
import film from '../../mocks/film.js';

it(`MovieTabDetails correctly renders`, () => {
  const {
    director,
    starring,
    runTime,
    genre,
    released
  } = film;

  const tree = renderer
    .create(<MovieTabDetails
      director={director}
      starring={starring}
      runTime={runTime}
      genre={genre}
      released={released}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
