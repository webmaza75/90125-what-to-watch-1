import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {App} from './app.jsx';
import films from '../../mocks/films.js';

window.HTMLMediaElement.prototype.play = () => {};

Enzyme.configure({adapter: new Adapter()});

describe(`App correctly renders after relaunch`, () => {
  it(`App renders all film items`, () => {
    const clickHandler = jest.fn();
    const app = mount(<App
      films={films}
      onClick={clickHandler}
      filter={`All genres`}
      filmsGroup={films}
    />);

    const link = app.find(`.small-movie-card__link`);
    const filmsLength = films.length;
    expect(link).toHaveLength(filmsLength);
  });

  it(`App has correctly state when user hover card`, () => {
    const app = mount(<App
      films={films}
      onClick={jest.fn()}
      filter={`All genres`}
      filmsGroup={films}
    />);

    const card = app.find(`.small-movie-card__image`).first();
    card.simulate(`mouseOver`);
    const film = films[0];
    expect(app.state(`selectedFilm`)).toEqual(film);
  });

  it(`App correctly renders Menu where first genre\`s element is All genres`, () => {
    const app = mount(<App
      films={films}
      onClick={jest.fn()}
      filter={`All genres`}
      filmsGroup={films}
    />);
    const genreList = app.state(`genres`);

    expect(genreList[0]).toEqual(`All genres`);
  });

  it(`App correctly renders Menu where first genre\`s element is All genres`, () => {
    const filmsGroup = [{
      genre: [`Drama`, `Comedy`],
      title: `The Grand Budapest Hotel`,
      desc: `The Grand Budapest Hotel is a 2014 comedy film written and directed by Wes Anderson, from a story by Anderson and Hugo Guinness, inspired by the writings of Stefan Zweig, to whom Anderson wrote the film as a tribute.`,
      picture: `the-grand-budapest-hotel-poster.jpg`,
      year: 2014,
      src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    }];
    const app = mount(<App
      films={films}
      onClick={jest.fn()}
      filter={`Comedy`}
      filmsGroup={filmsGroup}
    />);
    const genreList = app.state(`genres`);

    expect(genreList[0]).toEqual(`All genres`);
  });
});
