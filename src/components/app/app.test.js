import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';
import films from '../../mocks/films.js';
import {ALL_GENRES} from '../../consts.js';
import genres from '../../mocks/genres.js';

window.HTMLMediaElement.prototype.play = () => {};

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
      filter={ALL_GENRES}
      filmsGroup={films}
      genres={genres}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
