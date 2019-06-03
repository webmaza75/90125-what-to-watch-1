import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {App} from './app.jsx';
import films from '../../mocks/films.js';
import {ALL_GENRES} from '../../consts.js';

window.HTMLMediaElement.prototype.play = () => {};

Enzyme.configure({adapter: new Adapter()});

describe(`App correctly renders after relaunch`, () => {
  it(`App renders all film items`, () => {
    const app = mount(<App
      films={films}
      filter={ALL_GENRES}
      filmsGroup={films}
    />);

    const link = app.find(`.small-movie-card__link`);
    const filmsLength = films.length;
    expect(link).toHaveLength(filmsLength);
  });

  it(`App correctly renders Menu where first genre\`s element is All genres`, () => {
    const app = mount(<App
      films={films}
      filter={ALL_GENRES}
      filmsGroup={films}
    />);
    const genreList = app.state(`genres`);

    expect(genreList[0]).toEqual(ALL_GENRES);
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
      filter={`Comedy`}
      filmsGroup={filmsGroup}
    />);
    const genreList = app.state(`genres`);

    expect(genreList[0]).toEqual(ALL_GENRES);
  });
});
