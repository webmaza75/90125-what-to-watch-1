import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app.jsx';
import filmList from '../../mock/filmList.js';

Enzyme.configure({adapter: new Adapter()});

describe(`App correctly renders after relaunch`, () => {
  it(`App renders all film items`, () => {
    const app = shallow(<App
      filmList={filmList}
    />);

    const playButton = app.find(`.small-movie-card__link`);
    const filmListLength = filmList.length;
    expect(playButton).toHaveLength(filmListLength);
  });

  it(`There is a clickable title into the film\`s item`, () => {
    const clickHandler = jest.fn();
    const app = shallow(<App
      filmList={filmList}
      onClick={clickHandler}
    />);

    const playButton = app.find(`.small-movie-card__link`).first();
    playButton.simulate(`click`, {preventDefault() {}});
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
