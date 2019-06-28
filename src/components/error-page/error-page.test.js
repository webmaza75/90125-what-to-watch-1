import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import ErrorPage from './error-page.jsx';

it(`ErrorPage correctly renders`, () => {
  const tree = renderer
    .create(<MemoryRouter initialEntries={[`/`]}>
      <ErrorPage />
    </MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
