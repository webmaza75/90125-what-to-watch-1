import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './app.jsx';
import films from '../../mocks/films.js';

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

Enzyme.configure({adapter: new Adapter()});

describe(`App correctly renders after relaunch`, () => {
  it(`App renders all film items`, () => {
    const clickHandler = jest.fn();
    const app = mount(<App
      films={films}
      onClick={clickHandler}
      onHover={jest.fn()}
    />);

    const link = app.find(`.small-movie-card__link`);
    const filmsLength = films.length;
    expect(link).toHaveLength(filmsLength);
  });

  it(`App has correctly state when user hover card`, () => {
    const onHover = jest.fn();
    const app = mount(<App
      films={films}
      onClick={jest.fn()}
      onHover={onHover}
    />);

    const card = app.find(`.small-movie-card__image`).first();
    card.simulate(`mouseOver`);
    const film = films[0];
    expect(app.state(`selectedFilm`)).toEqual(film);
  });
});
