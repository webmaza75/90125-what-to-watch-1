import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import {SignIn} from './sign-in.jsx';
import {ValidationErrors} from '../../consts.js';

describe(`SignIn correctly renders`, () => {
  it(`SignIn correctly renders without any errors`, () => {
    const signIn = renderer
      .create(<MemoryRouter initialEntries={[`/`]}>
        <SignIn
          email={`qwe@qwe.ru`}
          password={`123`}
          onFormSubmit={jest.fn()}
          onChangeEmail={jest.fn()}
          onChangePassword={jest.fn()}
          validationError={null}
          onSetError={jest.fn()}
        />
      </MemoryRouter>)
      .toJSON();

    expect(signIn).toMatchSnapshot();
  });

  it(`SignIn correctly renders with an error`, () => {
    const signIn = renderer
      .create(<MemoryRouter initialEntries={[`/`]}>
        <SignIn
          email={`qwe@qwe.ru`}
          password={` `}
          onFormSubmit={jest.fn()}
          onChangeEmail={jest.fn()}
          onChangePassword={jest.fn()}
          validationError={ValidationErrors.INVALID_PASSWORD}
          onSetError={jest.fn()}
        />
      </MemoryRouter>)
      .toJSON();

    expect(signIn).toMatchSnapshot();
  });
});
