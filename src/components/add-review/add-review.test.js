import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {AddReview} from './add-review.jsx';
import film from '../../mocks/film.js';

describe(`AddReview`, () => {
  it(`AddReview correctly renders`, () => {
    const renderer = new ShallowRenderer();
    const result = renderer
      .render(<AddReview
        movie={film}
        text={null}
        validationError={null}
        selectedOption={null}
        submiting={false}
        onCheck={jest.fn()}
        onChangeText={jest.fn()}
        onAddComment={jest.fn()}
        isDisabled={true}
      />);

    expect(result).toMatchSnapshot();
  });
});
