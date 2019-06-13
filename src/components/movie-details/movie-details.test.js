import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import MovieDetails from './movie-details.jsx';

const initialState = {};
const mockStore = configureStore();

describe(`MovieDetails`, () => {
  it(`MovieDetails correctly renders`, () => {
    const tree = renderer
      .create(<Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[`/`]}>
          <MovieDetails />
        </MemoryRouter>
      </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
