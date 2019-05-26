import React from 'react';
import renderer from 'react-test-renderer';

import GenreList from './genre-list.jsx';
import {ALL_GENRES} from '../../consts.js';

const filter = `Drama`;
const genres = [ALL_GENRES, `Comedy`, `Drama`, `Triller`];

it(`GenreList correctly renders`, () => {
  const genreList = renderer
    .create(<GenreList
      genres={genres}
      activeFilter={filter}
      onGenreChange={jest.fn()}
    />)
    .toJSON();

  expect(genreList).toMatchSnapshot();
});
