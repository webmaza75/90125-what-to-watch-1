import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`App correctly renders after relaunch`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<App
    filmList={[]}
    onClick={clickHandler}
  />);

  const playButton = app.find(`.small-movie-card__link`);
  playButton.simulate(`click`, {preventDefault() {}});

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
