import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './app.jsx';
import films from '../../mocks/films.js';

Enzyme.configure({adapter: new Adapter()});

describe(`App correctly renders after relaunch`, () => {
  it(`App renders all film items`, () => {
    const clickHandler = jest.fn();
    const app = mount(<App
      films={films}
      onClick={clickHandler}
    />);

    const playButton = app.find(`.small-movie-card__link`);
    const filmsLength = films.length;
    expect(playButton).toHaveLength(filmsLength);
  });
});
