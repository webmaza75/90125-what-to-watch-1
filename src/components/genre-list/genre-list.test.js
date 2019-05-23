import React from 'react';
import renderer from 'react-test-renderer';

import GenreList from './genre-list.jsx';

const filter = `Drama`;
const genres = [`All genres`, `Comedy`, `Drama`, `Triller`];

it(`GenreList correctly renders`, () => {
  const genreList = renderer
    .create(<GenreList
      genres={genres}
      filter={filter}
      onClick={jest.fn()}
    />)
    .toJSON();

  expect(genreList).toMatchSnapshot();
});
