import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {Main} from './main.jsx';
import films from '../../mocks/films.js';
import {ALL_GENRES} from '../../consts.js';
import genres from '../../mocks/genres.js';
import reducer from '../../reducers/reducer.js';

window.HTMLMediaElement.prototype.play = () => {};

it(`Main correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<Provider store={createStore(reducer)}>
      <MemoryRouter initialEntries={[`/`]}>
        <Main
          filter={ALL_GENRES}
          filmsGroup={films}
          genres={genres}
          onChangeFilter={jest.fn()}
          onLoadPromo={jest.fn()}
          promo={films[0]}
          onResetMaxShowFilms={jest.fn()}
        />
      </MemoryRouter>
    </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
