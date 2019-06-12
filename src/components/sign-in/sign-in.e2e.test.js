import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {SignIn} from './sign-in.jsx';
import {ValidationErrors} from '../../consts.js';

configure({adapter: new Adapter()});

describe(`SignIn should correctly validate form`, () => {
  it(`SignIn should correctly validate password`, () => {
    const tree = mount(<SignIn
      email={`qwe@qwe.ru`}
      password={ ` `}
      validationError={null}
      error={null}
      onChangeEmail={jest.fn()}
      onChangePassword={jest.fn()}
      onSetError={jest.fn()}
    />);

    tree.find(`form`).simulate(`submit`);
    tree.update();
    expect(tree.prop(`onSetError`)).toHaveBeenCalledWith(ValidationErrors.INVALID_PASSWORD);
  });

  it(`SignIn should correctly validate email`, () => {
    const tree = mount(<SignIn
      email={` `}
      password={ `1`}
      validationError={null}
      error={null}
      onChangeEmail={jest.fn()}
      onChangePassword={jest.fn()}
      onSetError={jest.fn()}
    />);

    tree.find(`form`).simulate(`submit`);
    tree.update();
    expect(tree.prop(`onSetError`)).toHaveBeenCalledWith(ValidationErrors.INVALID_EMAIL);
  });

  it(`SignIn should correctly validate email`, () => {
    const tree = mount(<SignIn
      email={` `}
      password={ ``}
      validationError={`5`}
      error={null}
      onChangeEmail={jest.fn()}
      onChangePassword={jest.fn()}
      onSetError={jest.fn()}
    />);

    tree.find(`form`).simulate(`submit`);
    tree.update();
    expect(tree.prop(`onSetError`)).toHaveBeenCalledWith(ValidationErrors.INVALID_EMAIL_AND_PASSWORD);
  });
});