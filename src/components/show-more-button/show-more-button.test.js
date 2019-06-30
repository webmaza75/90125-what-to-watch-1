import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {ShowMoreButton} from './show-more-button.jsx';
import reducer from '../../reducers/reducer.js';
import films from '../../mocks/films.js';

describe(`ShowMoreButton`, () => {
  it(`ShowMoreButton correctly renders when films more when limit to show`, () => {
    const showMoreButton = renderer
      .create(<Provider store={createStore(reducer)}>
        <ShowMoreButton maxShowFilms={2} filmsGroup={films} />
      </Provider>)
      .toJSON();

    expect(showMoreButton).toMatchSnapshot();
  });

  it(`ShowMoreButton correctly renders when films count equal to limit to show`, () => {
    const showMoreButton = renderer
      .create(<Provider store={createStore(reducer)}>
        <ShowMoreButton maxShowFilms={3} filmsGroup={films} />
      </Provider>)
      .toJSON();

    expect(showMoreButton).toMatchSnapshot();
  });

  it(`ShowMoreButton doesn\`t render when films count less when limit to show`, () => {
    const showMoreButton = renderer
      .create(<Provider store={createStore(reducer)}>
        <ShowMoreButton maxShowFilms={20} filmsGroup={films} />
      </Provider>)
      .toJSON();

    expect(showMoreButton).toMatchSnapshot();
  });
});
