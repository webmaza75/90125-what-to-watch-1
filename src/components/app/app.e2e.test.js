import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {App} from './app.jsx';
import films from '../../mocks/films.js';
import {ALL_GENRES} from '../../consts.js';
import genres from '../../mocks/genres.js';

window.HTMLMediaElement.prototype.play = () => {};

Enzyme.configure({adapter: new Adapter()});

describe(`App correctly renders after relaunch`, () => {
  it(`App renders all film items`, () => {
    const app = mount(<App
      filter={ALL_GENRES}
      filmsGroup={films}
      genres={genres}
    />);

    const link = app.find(`.small-movie-card__link`);
    const filmsLength = films.length;
    expect(link).toHaveLength(filmsLength);
  });

  it(`App correctly renders Menu where first genre\`s element is All genres`, () => {
    const app = mount(<App
      filter={ALL_GENRES}
      filmsGroup={films}
      genres={genres}
    />);
    const genreList = app.prop(`genres`);

    expect(genreList[0]).toEqual(ALL_GENRES);
  });

  it(`App correctly renders Menu where first genre\`s element is All genres`, () => {
    const filmsGroup = [{
      genre: `Comedy`,
      title: `The Grand Budapest Hotel`,
      picture: `the-grand-budapest-hotel-poster.jpg`,
      src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      id: 1
    }];
    const app = mount(<App
      filter={`Comedy`}
      filmsGroup={filmsGroup}
      genres={genres}
    />);
    const genreList = app.prop(`genres`);

    expect(genreList[0]).toEqual(ALL_GENRES);
  });
});
