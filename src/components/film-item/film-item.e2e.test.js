import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';

import FilmItem from './film-item.jsx';
import film from '../../mocks/film.js';

configure({adapter: new Adapter()});

window.HTMLMediaElement.prototype.play = () => {};

describe(`Film and callbacks`, () => {
  it(`FilmItem should call mouseOver with film`, () => {
    const onMouseOver = jest.fn();
    const item = mount(<MemoryRouter initialEntries={[`/`]}>
      <FilmItem
        item={film}
        isPlaying={false}
        onMouseOver={onMouseOver}
        onMouseOut={jest.fn()}
      />
    </MemoryRouter>);

    const card = item.find(`.small-movie-card__image`);
    card.simulate(`mouseOver`);

    expect(onMouseOver).toHaveBeenCalledWith(film);
    expect(item.find(FilmItem)).toHaveLength(1);
  });

  it(`FilmItem should call mouseOut with film`, () => {
    const onMouseOut = jest.fn();
    const item = mount(<MemoryRouter initialEntries={[`/`]}>
      <FilmItem
        item={film}
        isPlaying={true}
        onMouseOver={jest.fn()}
        onMouseOut={onMouseOut}
      />
    </MemoryRouter>);

    const card = item.find(`video`);
    card.simulate(`mouseOut`);

    expect(onMouseOut).toHaveBeenCalledTimes(1);
    expect(item.find(`.small-movie-card__image`)).toHaveLength(1);
  });
});
