import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmItem from './film-item.jsx';

configure({adapter: new Adapter()});

describe(`Film item correctly renders after relaunch`, () => {
  it(`FilmItem resends correctly item`, () => {
    const mock = {
      genre: [`Drama`, `Thriller`],
      title: `Aviator`,
      desc: ``,
      picture: `aviator.jpg`,
      year: 2016
    };
    const handleClick = jest.fn();
    const item = mount(<FilmItem
      item={mock}
      onClick={handleClick}
    />);

    const playButton = item.find(`.small-movie-card__play-btn`);
    playButton.simulate(`click`);

    expect(handleClick).toHaveBeenCalledWith(mock);
  });

  it(`There is a clickable title into the film\`s item`, () => {
    const mock = {
      genre: [`Drama`, `Thriller`],
      title: `Aviator`,
      desc: ``,
      picture: `aviator.jpg`,
      year: 2016
    };
    const handleClick = jest.fn();
    const item = mount(<FilmItem
      item={mock}
      onClick={handleClick}
    />);

    const playButton = item.find(`.small-movie-card__link`).first();
    playButton.simulate(`click`, {preventDefault() {}});
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
