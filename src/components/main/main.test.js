import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';

import {Main} from './main.jsx';
import films from '../../mocks/films.js';
import {ALL_GENRES} from '../../consts.js';
import genres from '../../mocks/genres.js';

window.HTMLMediaElement.prototype.play = () => {};
const context = {};

it(`Main correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<StaticRouter location="someLocation" context={context}>
      <Main
        filter={ALL_GENRES}
        filmsGroup={films}
        genres={genres}
      />
    </StaticRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
