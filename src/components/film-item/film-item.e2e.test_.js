import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmItem from './film-item.jsx';
import VideoPlayer from '../video-player/video-player.jsx';
import film from '../../mocks/film.js';

window.HTMLMediaElement.prototype.play = () => {};

configure({adapter: new Adapter()});

// TODO
// 0. Вернуть файлу корректное название, чтобы запускались тесты
// 1. переделать тесты с учетом "чистого" film-item.jsx, без хока
// 2. перенести/доработать/создать недостающие тесты для хока этого компонента

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
    jest.useFakeTimers();

    const onMouseOver = jest.fn();
    const item = mount(<FilmItem
      item={film}
      onClick={jest.fn()}
      onHover={onMouseOver}
    />);

    const card = item.find(`.small-movie-card__image`);
    card.simulate(`mouseOver`, onMouseOver);

    jest.runAllTimers();
    item.update();

    const player = item.find(VideoPlayer);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    expect(player).toHaveLength(1);
    expect(player.instance().props.isPlaying).toBeTruthy();

    jest.clearAllTimers();
  });

  it(`Video does not appears on mouseover event before 1 sec`, () => {
    jest.useFakeTimers();

    const onMouseOver = jest.fn();
    const item = mount(<FilmItem
      item={film}
      onClick={jest.fn()}
      onHover={onMouseOver}
    />);

    const card = item.find(`.small-movie-card__image`);
    card.simulate(`mouseOver`, onMouseOver);

    jest.advanceTimersByTime(500);
    item.update();

    expect(item.find(VideoPlayer).exists()).toBeFalsy();
    expect(item.find(`img`)).toHaveLength(1);

    jest.clearAllTimers();
  });

  it(`Video stops on mouseout event`, () => {
    jest.useFakeTimers();

    const onMouseOver = jest.fn();
    const item = mount(<FilmItem
      item={film}
      onClick={jest.fn()}
      onHover={onMouseOver}
    />);

    const card = item.find(`.small-movie-card__image`);
    card.simulate(`mouseOver`, onMouseOver);

    jest.runAllTimers();
    item.update();
    card.simulate(`mouseOut`);

    expect(item.find(VideoPlayer).exists()).toBeFalsy();
    expect(item.find(`img`)).toHaveLength(1);

    jest.clearAllTimers();
  });
});
