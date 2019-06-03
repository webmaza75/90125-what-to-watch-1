import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';
import films from '../../mocks/films.js';
import {ALL_GENRES} from '../../consts.js';

window.HTMLMediaElement.prototype.play = () => {};

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
      films={films}
      filter={ALL_GENRES}
      filmsGroup={films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
