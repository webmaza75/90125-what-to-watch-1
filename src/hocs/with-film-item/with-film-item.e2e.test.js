import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withFilmItem from './with-film-item.js';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;

describe(`MockComponent and wrapper`, () => {
  it(`MockComponent should not play after .5s`, () => {
    const MockComponentWrapped = withFilmItem(MockComponent);
    const wrapper = mount(<MockComponentWrapped
      onHover={jest.fn()}
    />);
    jest.useFakeTimers();

    wrapper.find(MockComponent).prop(`onMouseOver`)(5);
    jest.advanceTimersByTime(500);
    wrapper.update();

    expect(wrapper.find(MockComponent).prop(`isPlaying`)).toBeFalsy();
    jest.clearAllTimers();
  });

  it(`MockComponent should not play after 1s`, () => {
    const MockComponentWrapped = withFilmItem(MockComponent);
    const onHover = jest.fn();
    const wrapper = mount(<MockComponentWrapped
      onHover={onHover}
    />);
    jest.useFakeTimers();

    wrapper.find(MockComponent).prop(`onMouseOver`)(50);
    jest.advanceTimersByTime(1000);
    wrapper.update();

    expect(wrapper.find(MockComponent).prop(`isPlaying`)).toBeTruthy();
    expect(onHover).toHaveBeenNthCalledWith(1, 50);
    jest.clearAllTimers();
  });

  it(`MockComponent should not play after 1s`, () => {
    const MockComponentWrapped = withFilmItem(MockComponent);
    const onHover = jest.fn();
    const wrapper = mount(<MockComponentWrapped
      onHover={onHover}
    />);
    jest.useFakeTimers();

    wrapper.find(MockComponent).prop(`onMouseOver`)(50);
    jest.advanceTimersByTime(1000);
    wrapper.update();

    expect(wrapper.find(MockComponent).prop(`isPlaying`)).toBeTruthy();
    expect(onHover).toHaveBeenNthCalledWith(1, 50);
    jest.clearAllTimers();
  });

  it(`MockComponent should not play after 1s and MouseOut`, () => {
    const MockComponentWrapped = withFilmItem(MockComponent);
    const onHover = jest.fn();
    const wrapper = mount(<MockComponentWrapped
      onHover={onHover}
    />);
    jest.useFakeTimers();

    wrapper.find(MockComponent).prop(`onMouseOver`)(50);
    jest.advanceTimersByTime(1500);
    wrapper.update();
    wrapper.find(MockComponent).prop(`onMouseOut`)();
    wrapper.update();

    expect(wrapper.find(MockComponent).prop(`isPlaying`)).toBeFalsy();
    expect(wrapper.find(MockComponent).prop(`isNeedReload`)).toBeTruthy();
    jest.clearAllTimers();
  });
});
