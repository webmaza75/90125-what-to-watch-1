import React from 'react';
import renderer from 'react-test-renderer';

import SignIn from './sign-in.jsx';
import {ValidationErrors} from '../../consts.js';

describe(`SignIn correctly renders`, () => {
  it(`SignIn correctly renders without any errors`, () => {
    const signIn = renderer
      .create(<SignIn
        email={`qwe@qwe.ru`}
        password={`123`}
        onSubmit={jest.fn()}
        onChangeEmail={jest.fn()}
        onChangePassword={jest.fn()}
        validationError={null}
      />)
      .toJSON();

    expect(signIn).toMatchSnapshot();
  });

  it(`SignIn correctly renders with an error`, () => {
    const signIn = renderer
      .create(<SignIn
        email={`qwe@qwe.ru`}
        password={` `}
        onSubmit={jest.fn()}
        onChangeEmail={jest.fn()}
        onChangePassword={jest.fn()}
        validationError={ValidationErrors.INVALID_PASSWORD}
      />)
      .toJSON();

    expect(signIn).toMatchSnapshot();
  });

  it(`SignIn correctly renders with an email\`s error`, () => {
    const signIn = renderer
      .create(<SignIn
        email={``}
        password={`1`}
        onSubmit={jest.fn()}
        onChangeEmail={jest.fn()}
        onChangePassword={jest.fn()}
        validationError={ValidationErrors.INVALID_EMAIL}
      />)
      .toJSON();

    expect(signIn).toMatchSnapshot();
  });
});
