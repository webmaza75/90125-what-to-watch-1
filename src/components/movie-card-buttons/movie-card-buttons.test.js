import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {MovieCardButtons} from './movie-card-buttons.jsx';
import film from '../../mocks/film.js';
import reducer from '../../reducers/reducer.js';

describe(`MovieCardButtons correctly renders`, () => {
  it(`MovieCardButtons correctly renders for authorized user`, () => {
    const renderer = new ShallowRenderer();
    const result = renderer
      .render(<Provider store={createStore(reducer)}>
        <MovieCardButtons
          isAuthorized={true}
          isFavorite={false}
          id={film.id}
          showAddReviewLink={false}
        />
      </Provider>);

    expect(result).toMatchSnapshot();
  });
});
