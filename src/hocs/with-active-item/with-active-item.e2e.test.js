import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withActiveItem from './with-active-item.js';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;

describe(`MockComponent and wrapper`, () => {
  it(`MockComponent should has correctly props, wrapper should has correctly state when calls onChange`, () => {
    const MockComponentWrapped = withActiveItem(MockComponent);
    const wrapper = mount(<MockComponentWrapped />);

    wrapper.find(MockComponent).prop(`onChange`)(5);
    wrapper.update();
    expect(wrapper.find(MockComponent).prop(`activeItem`)).toEqual(5);
    expect(wrapper.state(`activeItem`)).toEqual(5);
  });
});
