import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';

import Header from './header.jsx';
// import user from '../../mocks/user.js';

it(`Header correctly renders`, () => {
  const context = {};
  const header = renderer
    .create(<StaticRouter location="someLocation" context={context}>
      <Header
        user={null}
      />
    </StaticRouter>)
    .toJSON();

  expect(header).toMatchSnapshot();
});
