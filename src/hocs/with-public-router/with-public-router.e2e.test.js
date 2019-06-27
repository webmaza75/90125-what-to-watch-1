import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Redirect} from 'react-router-dom';

import {withPublicRouter} from './with-public-router.js';
import user from '../../mocks/user.js';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;

describe(`MockComponent and wrapper`, () => {
  it(`MockComponent should render wrapped component`, () => {
    const props = {prop1: 1};
    const MockComponentWrapped = withPublicRouter(MockComponent);
    const wrapper = mount(<MockComponentWrapped
      {...props}
    />);

    expect(wrapper.find(MockComponent)).toHaveLength(1);
    expect(wrapper.find(MockComponent).props()).toEqual(props);
  });

  it(`MockComponent renders Redirect`, () => {
    const to = `/`;
    const props = {prop1: 1, user};
    const MockComponentWrapped = withPublicRouter(MockComponent);
    const wrapper = shallow(<MockComponentWrapped
      {...props}
    />);

    expect(wrapper.find(Redirect)).toHaveLength(1);
    expect(wrapper.find(Redirect).prop(`to`)).toEqual(to);
  });
});
