import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {MovieDetails} from './movie-details.jsx';
import film from '../../mocks/film.js';
import filmList from '../../mocks/films.js';

it(`MovieDetails correctly renders`, () => {
  const renderer = new ShallowRenderer();
  const result = renderer
    .render(<MovieDetails
      movie={film}
      films={filmList}
      comments={[]}
      isAuthorized={false}
      onLoadComments={jest.fn()}
      onToggleFavorite={jest.fn()}
    />);

  expect(result).toMatchSnapshot();
});
