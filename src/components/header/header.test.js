import React from 'react';
import renderer from 'react-test-renderer';

import Header from './header.jsx';
// import user from '../../mocks/user.js';

it(`Header correctly renders`, () => {
  const header = renderer
    .create(<Header
      isRequiredAuthentication={true}
      onClick={jest.fn()}
      user={null}
    />)
    .toJSON();

  expect(header).toMatchSnapshot();
});
