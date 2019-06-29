import React from 'react';
import renderer from 'react-test-renderer';

import {MemoryRouter} from 'react-router-dom';
import FilmItem from './film-item.jsx';
import film from '../../mocks/film.js';

window.HTMLMediaElement.prototype.play = () => {};

describe(``, () => {
  it(`Film item correctly renders with isPlaying false`, () => {
    const tree = renderer
      .create(<MemoryRouter initialEntries={[`/`]}>
        <FilmItem
          item={film}
          isPlaying={false}
          onMouseOver={jest.fn()}
          onMouseOut={jest.fn()}
        />
      </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Film item correctly renders with isPlaying true`, () => {
    const tree = renderer
      .create(<MemoryRouter initialEntries={[`/`]}>
        <FilmItem
          item={film}
          isPlaying={true}
          onMouseOver={jest.fn()}
          onMouseOut={jest.fn()}
          isNeedReload={false}
        />
      </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
