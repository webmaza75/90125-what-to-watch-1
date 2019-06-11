import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {StaticRouter} from 'react-router';

import Header from './header.jsx';
import user from '../../mocks/user.js';

configure({adapter: new Adapter()});
const context = {};

describe(`Header item correctly renders after relaunch`, () => {
  it(`Header resends correctly guest block`, () => {
    const header = mount(<StaticRouter>
      <Header
        user={null}
      />
    </StaticRouter>);

    expect(header.find(`.user-block__link`)).toHaveLength(1);
  });

  it(`Header resends correctly authenticated user\`s block`, () => {
    const header = mount(<StaticRouter location="someLocation" context={context}>
      <Header
        user={user}
      />
    </StaticRouter>);

    expect(header.find(`.user-block__link`)).toHaveLength(0);
    expect(header.find(`img`)).toHaveLength(1);
  });
});
