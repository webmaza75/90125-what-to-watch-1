import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../../reducers/index.js';

import withMyListButton from './with-my-list-button.js';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;

describe(`MockComponent and wrapper`, () => {
  it(`MockComponent should has correctly props when guest calls onMyListClick`, () => {
    const MockComponentWrapped = withMyListButton(MockComponent);
    const wrapper = mount(<Provider store={createStore(reducer)}>
      <MockComponentWrapped
        isAuthorized={false}
      />
    </Provider>);
    const event = {
      preventDefault: () => {}
    };

    wrapper.find(MockComponent).prop(`onMyListClick`)(event);
    wrapper.update();
    expect(wrapper.find(MockComponent).prop(`needRedirect`)).toBeTruthy();
  });
});
