import React from 'react';
import renderer from 'react-test-renderer';

import SignInHeader from './sign-in-header.jsx';

it(`SignInHeader correctly renders`, () => {
  const signInHeader = renderer
    .create(<SignInHeader />)
    .toJSON();

  expect(signInHeader).toMatchSnapshot();
});
