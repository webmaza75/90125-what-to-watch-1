import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmItem from './film-item.jsx';
import film from '../../mocks/film.js';

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

configure({adapter: new Adapter()});

describe(`Film item correctly renders after relaunch`, () => {
  it(`FilmItem resends correctly item`, () => {
    const handleClick = jest.fn();
    const item = mount(<FilmItem
      item={film}
      onClick={handleClick}
    />);

    const playButton = item.find(`.small-movie-card__play-btn`);
    playButton.simulate(`click`, {preventDefault() {}});

    expect(handleClick).toHaveBeenCalledWith(film);
    expect(item.find(FilmItem)).toHaveLength(1);
  });
});
