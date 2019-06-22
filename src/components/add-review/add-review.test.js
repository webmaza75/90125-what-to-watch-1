import React from 'react';
import renderer from 'react-test-renderer';

import {MemoryRouter} from 'react-router-dom';
import {AddReview} from './add-review.jsx';
import film from '../../mocks/film.js';
import user from '../../mocks/user.js';

describe(`AddReview`, () => {
  it(`AddReview correctly renders`, () => {
    const tree = renderer
      .create(<MemoryRouter initialEntries={[`/`]}>
        <AddReview
          user={user}
          movie={film}
          text={null}
          validationError={null}
          selectedOption={null}
          submiting={false}
          onCheck={jest.fn()}
          onChangeText={jest.fn()}
          onAddComment={jest.fn()}
        />
      </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
