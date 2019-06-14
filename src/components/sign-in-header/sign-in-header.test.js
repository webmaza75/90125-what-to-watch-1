import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import SignInHeader from './sign-in-header.jsx';

it(`SignInHeader correctly renders`, () => {
  const signInHeader = renderer
    .create(<MemoryRouter initialEntries={[`/`]}>
      <SignInHeader />
    </MemoryRouter>)
    .toJSON();

  expect(signInHeader).toMatchSnapshot();
});
