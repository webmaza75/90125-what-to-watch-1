import React from 'react';
import renderer from 'react-test-renderer';

import GenreList from '../components/genre-list/genre-list.jsx';
import {ALL_GENRES} from '../consts.js';
import withActiveItem from './with-active-item.js';

window.HTMLMediaElement.prototype.play = () => {};

const filter = `Drama`;
const genres = [ALL_GENRES, `Comedy`, `Drama`, `Triller`];
const GenreListWrapped = withActiveItem(GenreList);

it(`GenreListWrapped correctly renders`, () => {
  const genreListWrapped = renderer
    .create(<GenreListWrapped
      genres={genres}
      actions={jest.fn()}
      activeItem={filter}
    />)
    .toJSON();

  expect(genreListWrapped).toMatchSnapshot();
});
