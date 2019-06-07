import React from 'react';
import renderer from 'react-test-renderer';

import SignIn from './sign-in.jsx';

it(`SignIn correctly renders`, () => {
  const signIn = renderer
    .create(<SignIn
      email={`qwe@qwe.ru`}
      password={`123`}
      onSubmit={jest.fn()}
      onChangeEmail={jest.fn()}
      onChangePassword={jest.fn()}
      errorPassword={null}
    />)
    .toJSON();

  expect(signIn).toMatchSnapshot();
});
