import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import reducer from '../../reducers/reducer.js';
import withAddReview from './with-add-review.js';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;

const text = `It was well acted, directed, and the music was good.`;
const value = `4`;

describe(`MockComponent and wrapper`, () => {
  it(`MockComponent should has correctly props when user calls onCheck for radio`, () => {
    const MockComponentWrapped = withAddReview(MockComponent);
    const wrapper = mount(<Provider store={createStore(reducer)}>
      <MockComponentWrapped />
    </Provider>);
    const event = {
      preventDefault: () => {},
      target: {
        value
      }
    };

    wrapper.find(MockComponent).prop(`onCheck`)(event);
    wrapper.update();
    expect(wrapper.find(MockComponent).prop(`selectedOption`)).toEqual(value);
    expect(wrapper.find(MockComponent).prop(`validationError`)).toEqual(`Message is not allowed to be empty.`);
  });

  it(`MockComponent should has correctly props when user calls onChangeText for textarea`, () => {
    const MockComponentWrapped = withAddReview(MockComponent);
    const wrapper = mount(<Provider store={createStore(reducer)}>
      <MockComponentWrapped />
    </Provider>);
    const event = {
      preventDefault: () => {},
      target: {
        value: text
      }
    };

    wrapper.find(MockComponent).prop(`onChangeText`)(event);
    wrapper.update();
    expect(wrapper.find(MockComponent).prop(`text`)).toEqual(text);
    expect(wrapper.find(MockComponent).prop(`validationError`)).toEqual(`Rating is not allowed to be empty.`);
  });

  it(`MockComponent should has correctly props when user calls onSubmit`, () => {
    const MockComponentWrapped = withAddReview(MockComponent);
    const wrapper = mount(<Provider store={createStore(reducer)}>
      <MockComponentWrapped />
    </Provider>);
    const event = {
      preventDefault: () => {}
    };

    wrapper.setState({
      validationError: null
    });

    wrapper.find(MockComponent).prop(`onSubmit`)(event);
    wrapper.update();
    expect(wrapper.find(MockComponent).prop(`submiting`)).toBeTruthy();
  });
});
