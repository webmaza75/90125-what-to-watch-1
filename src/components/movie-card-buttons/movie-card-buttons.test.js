import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import MovieCardButtons from './movie-card-buttons.jsx';
import film from '../../mocks/film.js';

describe(`MovieCardButtons correctly renders`, () => {
  it(`MovieCardButtons correctly renders for authorized user`, () => {
    const renderer = new ShallowRenderer();
    const result = renderer
      .render(<MovieCardButtons
        isAuthorized={true}
        isFavorite={false}
        id={film.id}
        onMyListClick={jest.fn()}
        showAddReviewLink={false}
        isPromo={true}
      />);

    expect(result).toMatchSnapshot();
  });
});
