import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmItem from './film-item.jsx';
import VideoPlayer from '../video-player/video-player.jsx';
import film from '../../mocks/film.js';

window.HTMLMediaElement.prototype.play = () => {};

configure({adapter: new Adapter()});

describe(`Film item correctly renders after relaunch`, () => {
  it(`FilmItem resends correctly item`, () => {
    const onMouseOver = jest.fn();
    const item = mount(<FilmItem
      item={film}
      onClick={jest.fn()}
      onHover={onMouseOver}
    />);

    const card = item.find(`.small-movie-card__image`);
    card.simulate(`mouseOver`);

    expect(onMouseOver).toHaveBeenCalledWith(film);
    expect(item.find(FilmItem)).toHaveLength(1);
  });

  it(`Video plays on mouseover event after 1 sec`, () => {
    const onMouseOver = jest.fn();
    const item = mount(<FilmItem
      item={film}
      onClick={jest.fn()}
      onHover={onMouseOver}
    />);

    const card = item.find(`.small-movie-card__image`);
    card.simulate(`mouseOver`, onMouseOver);

    // TODO setTimeout заменить на метод jest, вызывающий все колбеки, объявленные в таймерах +
    // интервал из props
    setTimeout(() => {
      const player = item.find(VideoPlayer);
      expect(player).toHaveLength(1);
      expect(player.instance().props.isPlaying).toBeTruthy();
    }, 1000);
  });

  it(`Video does not appears on mouseover event before 1 sec`, () => {
    const onMouseOver = jest.fn();
    const item = mount(<FilmItem
      item={film}
      onClick={jest.fn()}
      onHover={onMouseOver}
    />);

    const card = item.find(`.small-movie-card__image`);
    card.simulate(`mouseOver`, onMouseOver);

    setTimeout(() => {
      expect(item.not.find(VideoPlayer));
      expect(item.find(`img`)).toHaveLength(1);
    }, 500);
  });

  it(`Video stops on mouseout event`, () => {
    const onMouseOver = jest.fn();
    const item = mount(<FilmItem
      item={film}
      onClick={jest.fn()}
      onHover={onMouseOver}
    />);

    const card = item.find(`.small-movie-card__image`);
    card.simulate(`mouseOver`, onMouseOver);

    setTimeout(() => {
      card.simulate(`mouseOut`);
      expect(item.not.find(VideoPlayer));
      expect(item.find(`img`)).toHaveLength(1);
    }, 1500);
  });
});
