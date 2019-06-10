import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmItem from './film-item.jsx';
import film from '../../mocks/film.js';

configure({adapter: new Adapter()});

window.HTMLMediaElement.prototype.play = () => {};

describe(`Film and callbacks`, () => {
  it(`FilmItem should call mouseOver with film`, () => {
    const onMouseOver = jest.fn();
    const item = mount(<FilmItem
      item={film}
      onClick={jest.fn()}
      isPlaying={false}
      onMouseOver={onMouseOver}
      onMouseOut={jest.fn()}
    />);

    const card = item.find(`.small-movie-card__image`);
    card.simulate(`mouseOver`);

    expect(onMouseOver).toHaveBeenCalledWith(film);
    expect(item.find(FilmItem)).toHaveLength(1);
  });

  it(`FilmItem should call Click with film`, () => {
    const onClick = jest.fn();
    const item = mount(<FilmItem
      item={film}
      onClick={onClick}
      isPlaying={false}
      onMouseOver={jest.fn()}
      onMouseOut={jest.fn()}
    />);

    const link = item.find(`.small-movie-card__link`);
    link.simulate(`click`);

    expect(onClick).toHaveBeenCalledWith(film);
    expect(item.find(FilmItem)).toHaveLength(1);
  });

  it(`FilmItem should call mouseOut with film`, () => {
    const onMouseOut = jest.fn();
    const item = mount(<FilmItem
      item={film}
      onClick={jest.fn()}
      isPlaying={true}
      onMouseOver={jest.fn()}
      onMouseOut={onMouseOut}
    />);

    const card = item.find(`video`);
    card.simulate(`mouseOut`);

    expect(onMouseOut).toHaveBeenCalledTimes(1);
    expect(item.find(`.small-movie-card__image`)).toHaveLength(1);
  });
});
