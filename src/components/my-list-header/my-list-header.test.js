import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';

import MyListHeader from './my-list-header.jsx';
import user from '../../mocks/user.js';

const context = {};

describe(`MyListHeader correctly renders`, () => {
  it(`MyListHeader correctly renders for authorized user`, () => {
    const myListHeader = renderer
      .create(<StaticRouter location="someLocation" context={context}>
        <MyListHeader
          user={user}
        />
      </StaticRouter>)
      .toJSON();

    expect(myListHeader).toMatchSnapshot();
  });
});
