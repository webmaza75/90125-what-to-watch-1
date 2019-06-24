import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import FilmPromo from './film-promo.jsx';
import film from '../../mocks/film.js';

it(`FilmPromo correctly renders`, () => {
  const {
    posterImage,
    title,
    genre,
    released,
    backgroundImage,
    id,
    isFavorite,
    isAuthorized
  } = film;

  const renderer = new ShallowRenderer();
  const result = renderer
    .render(<FilmPromo
      posterImage={posterImage}
      title={title}
      genre={genre}
      released={released}
      backgroundImage={backgroundImage}
      id={id}
      isFavorite={isFavorite}
      isAuthorized={isAuthorized}
    />);

  expect(result).toMatchSnapshot();
});
