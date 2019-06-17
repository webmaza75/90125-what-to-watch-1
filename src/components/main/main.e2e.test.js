import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {StaticRouter} from 'react-router';

import {Main} from './main.jsx';
import films from '../../mocks/films.js';
import {ALL_GENRES} from '../../consts.js';
import genres from '../../mocks/genres.js';

window.HTMLMediaElement.prototype.play = () => {};
const context = {};

Enzyme.configure({adapter: new Adapter()});

describe(`Main correctly renders after relaunch`, () => {
  it(`Main renders all film items`, () => {
    const main = mount(<StaticRouter location="someLocation" context={context}>
      <Main
        filter={ALL_GENRES}
        filmsGroup={films}
        genres={genres}
        user={null}
        onChangeFilter={jest.fn()}
      />
    </StaticRouter>);

    const link = main.find(`.small-movie-card__link`);
    const filmsLength = films.length;
    expect(link).toHaveLength(filmsLength);
  });

  it(`Main correctly renders Menu where first genre\`s element is All genres`, () => {
    const main = mount(<StaticRouter location="someLocation" context={context}>
      <Main
        filter={ALL_GENRES}
        filmsGroup={films}
        genres={genres}
        user={null}
        onChangeFilter={jest.fn()}
      />
    </StaticRouter>);

    const genreList = main.find(Main).prop(`genres`);

    expect(genreList[0]).toEqual(ALL_GENRES);
  });

  it(`Main correctly renders Menu where first genre\`s element is All genres`, () => {
    const filmsGroup = [{
      genre: `Comedy`,
      title: `The Grand Budapest Hotel`,
      picture: `the-grand-budapest-hotel-poster.jpg`,
      src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      id: 1
    }];
    const main = mount(<StaticRouter location="someLocation" context={context}>
      <Main
        filter={`Comedy`}
        filmsGroup={filmsGroup}
        genres={genres}
        user={null}
        onChangeFilter={jest.fn()}
      />
    </StaticRouter>);
    const genreList = main.find(Main).prop(`genres`);

    expect(genreList[0]).toEqual(ALL_GENRES);
  });
});
