import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import {Main} from './main.jsx';
import films from '../../mocks/films.js';
import {ALL_GENRES} from '../../consts.js';
import genres from '../../mocks/genres.js';

window.HTMLMediaElement.prototype.play = () => {};

it(`Main correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<MemoryRouter initialEntries={[`/`]}>
      <Main
        filter={ALL_GENRES}
        filmsGroup={films}
        genres={genres}
      />
    </MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
