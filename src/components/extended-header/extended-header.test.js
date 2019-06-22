import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';

import ExtendedHeader from './extended-header.jsx';
import user from '../../mocks/user.js';
import film from '../../mocks/film.js';

const context = {};

describe(`ExtendedHeader correctly renders`, () => {
  it(`ExtendedHeader correctly renders for authorized user`, () => {
    const header = renderer
      .create(<StaticRouter location="someLocation" context={context}>
        <ExtendedHeader
          user={user}
          movie={film}
        />
      </StaticRouter>)
      .toJSON();

    expect(header).toMatchSnapshot();
  });
});
