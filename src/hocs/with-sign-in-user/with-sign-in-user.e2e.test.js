import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withSignInUser from './with-sign-in-user.js';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;

describe(`MockComponent and wrapper`, () => {
  it(`MockComponent should has correctly props, wrapper should has correctly state when calls onChangeEmail`, () => {
    const MockComponentWrapped = withSignInUser(MockComponent);
    const wrapper = mount(<MockComponentWrapped />);
    const event = {
      preventDefault: () => {},
      target: {
        value: `qwe@qwe.ru`
      }
    };

    wrapper.find(MockComponent).prop(`onChangeEmail`)(event);
    wrapper.update();
    expect(wrapper.find(MockComponent).prop(`email`)).toEqual(`qwe@qwe.ru`);
  });

  it(`MockComponent should has correctly props, wrapper should has correctly state when calls onChangePassword`, () => {
    const MockComponentWrapped = withSignInUser(MockComponent);
    const wrapper = mount(<MockComponentWrapped />);
    const event = {
      preventDefault: () => {},
      target: {
        value: `10`
      }
    };

    wrapper.find(MockComponent).prop(`onChangePassword`)(event);
    wrapper.update();
    expect(wrapper.find(MockComponent).prop(`password`)).toEqual(`10`);
  });
});
