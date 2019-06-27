import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {Main} from './main.jsx';
import films from '../../mocks/films.js';
import {ALL_GENRES} from '../../consts.js';
import genres from '../../mocks/genres.js';
import reducer from '../../reducers/reducer.js';

window.HTMLMediaElement.prototype.play = () => {};

Enzyme.configure({adapter: new Adapter()});

describe(`Main correctly renders after relaunch`, () => {
  it(`Main renders all film items`, () => {
    const main = mount(<Provider store={createStore(reducer)}>
      <MemoryRouter initialEntries={[`/`]}>
        <Main
          filter={ALL_GENRES}
          filmsGroup={films}
          genres={genres}
          onChangeFilter={jest.fn()}
          onLoadPromo={jest.fn()}
          onToggleFavorite={jest.fn()}
          isAuthorized={false}
          promo={films[0]}
        />
      </MemoryRouter>
    </Provider>);

    const card = main.find(`.small-movie-card__title`);
    const filmsLength = films.length;
    expect(card).toHaveLength(filmsLength);
  });

  it(`Main correctly renders Menu where first genre\`s element is All genres`, () => {
    const main = shallow(<MemoryRouter initialEntries={[`/`]}>
      <Main
        filter={ALL_GENRES}
        filmsGroup={films}
        genres={genres}
        onChangeFilter={jest.fn()}
        onLoadPromo={jest.fn()}
        onToggleFavorite={jest.fn()}
        isAuthorized={false}
        promo={films[0]}
      />
    </MemoryRouter>);

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
    const main = shallow(<MemoryRouter initialEntries={[`/`]}>
      <Main
        filter={`Comedy`}
        filmsGroup={filmsGroup}
        genres={genres}
        user={null}
        onChangeFilter={jest.fn()}
        onLoadPromo={jest.fn()}
        onToggleFavorite={jest.fn()}
        isAuthorized={false}
        promo={films[0]}
      />
    </MemoryRouter>);
    const genreList = main.find(Main).prop(`genres`);

    expect(genreList[0]).toEqual(ALL_GENRES);
  });
});
