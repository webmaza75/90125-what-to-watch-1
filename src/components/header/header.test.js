import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';

import Header from './header.jsx';
import user from '../../mocks/user.js';

const context = {};

describe(`Header correctly renders`, () => {
  it(`Header correctly renders for guest`, () => {
    const header = renderer
      .create(<StaticRouter location="someLocation" context={context}>
        <Header
          user={null}
        />
      </StaticRouter>)
      .toJSON();

    expect(header).toMatchSnapshot();
  });

  it(`Header correctly renders for authorized user`, () => {
    const header = renderer
      .create(<StaticRouter location="someLocation" context={context}>
        <Header
          user={user}
        />
      </StaticRouter>)
      .toJSON();

    expect(header).toMatchSnapshot();
  });
});
