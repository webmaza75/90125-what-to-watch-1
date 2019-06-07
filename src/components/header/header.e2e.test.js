import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './header.jsx';
import user from '../../mocks/user.js';

configure({adapter: new Adapter()});

describe(`Header item correctly renders after relaunch`, () => {
  it(`Header resends correctly guest block`, () => {
    const header = mount(<Header
      isRequiredAuthentication={true}
      onClick={jest.fn()}
      user={null}
    />);

    expect(header.find(`.user-block__link`)).toHaveLength(1);
  });

  it(`Header resends correctly authenticated user\`s block`, () => {
    const header = mount(<Header
      isRequiredAuthentication={false}
      onClick={jest.fn()}
      user={user}
    />);

    expect(header.find(`.user-block__link`)).toHaveLength(0);
    expect(header.find(`img`)).toHaveLength(1);
  });

  it(`Header resends correctly on the SignIn page`, () => {
    const header = mount(<Header
      isRequiredAuthentication={true}
      onClick={jest.fn()}
      user={null}
      pageType={`signIn`}
    />);

    expect(header.find(`.user-page__title`)).toHaveLength(1);
    expect(header.find(`img`)).toHaveLength(0);
    expect(header.find(`.user-block__link`)).toHaveLength(0);
  });
});
