import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './header.jsx';
import user from '../../mocks/user.js';

configure({adapter: new Adapter()});

describe(`Header item correctly renders after relaunch`, () => {
  it(`Header resends correctly guest block`, () => {
    const header = mount(<Header
      onClick={jest.fn()}
      user={null}
    />);

    expect(header.find(`.user-block__link`)).toHaveLength(1);
  });

  it(`Header resends correctly authenticated user\`s block`, () => {
    const header = mount(<Header
      onClick={jest.fn()}
      user={user}
    />);

    expect(header.find(`.user-block__link`)).toHaveLength(0);
    expect(header.find(`img`)).toHaveLength(1);
  });

  it(`Should preventDefault when user click \"Sign in\" link`, () => {
    const onClick = jest.fn();
    const header = mount(<Header
      onClick={onClick}
      user={null}
    />);
    const event = {
      preventDefault: () => {}
    };

    header.prop(`onClick`)(event);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
