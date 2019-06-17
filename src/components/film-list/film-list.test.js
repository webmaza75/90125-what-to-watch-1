import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import FilmList from './film-list.jsx';
import film from '../../mocks/film.js';

window.HTMLMediaElement.prototype.play = () => {};

it(`Film list correctly renders`, () => {
  const tree = renderer
    .create(<MemoryRouter initialEntries={[`/`]}>
      <FilmList
        films={[film]}
        onChange={jest.fn()}
        activeItem={film}
      />
    </MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
