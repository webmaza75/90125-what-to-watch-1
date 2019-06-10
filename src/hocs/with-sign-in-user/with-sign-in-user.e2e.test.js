import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withSignInUser from './with-sign-in-user.js';
import {ValidationErrors} from '../../consts.js';

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

  it(`MockComponent should correctly validate password`, () => {
    const MockComponentWrapped = withSignInUser(MockComponent);
    const wrapper = mount(<MockComponentWrapped />);
    const state = {
      email: `qwe@qwe.ru`,
      password: ` `,
      validationError: null
    };
    const event = {
      preventDefault: () => {}
    };
    wrapper.setState(state);
    wrapper.find(MockComponent).prop(`onSubmit`)(event);
    expect(wrapper.state(`validationError`)).toBe(ValidationErrors.INVALID_PASSWORD);
  });

  it(`MockComponent should correctly validate email`, () => {
    const MockComponentWrapped = withSignInUser(MockComponent);
    const wrapper = mount(<MockComponentWrapped />);
    const state = {
      email: ` `,
      password: `1`,
      validationError: null
    };
    const event = {
      preventDefault: () => {}
    };

    wrapper.setState(state);
    wrapper.find(MockComponent).prop(`onSubmit`)(event);
    expect(wrapper.state(`validationError`)).toBe(ValidationErrors.INVALID_EMAIL);
  });

  it(`MockComponent should correctly validate email and password`, () => {
    const MockComponentWrapped = withSignInUser(MockComponent);
    const wrapper = mount(<MockComponentWrapped />);
    const state = {
      email: `     `,
      password: ` `,
      validationError: null
    };
    const event = {
      preventDefault: () => {}
    };

    wrapper.setState(state);
    wrapper.find(MockComponent).prop(`onSubmit`)(event);
    expect(wrapper.state(`validationError`)).toBe(ValidationErrors.INVALID_EMAIL_AND_PASSWORD);
  });
});
