import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withPlayer from './with-player.js';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;

describe(`MockComponent and wrapper`, () => {
  it(`MockComponent should has correctly props when user calls onTogglePlay`, () => {
    const MockComponentWrapped = withPlayer(MockComponent);
    const wrapper = mount(<MockComponentWrapped />);

    wrapper.find(MockComponent).prop(`onTogglePlay`)();
    wrapper.update();
    expect(wrapper.find(MockComponent).prop(`isPlaying`)).toBeTruthy();
  });

  it(`MockComponent should has correctly props when user calls onFullTimeSet`, () => {
    const MockComponentWrapped = withPlayer(MockComponent);
    const wrapper = mount(<MockComponentWrapped />);

    wrapper.find(MockComponent).prop(`onFullTimeSet`)(734);
    wrapper.update();
    expect(wrapper.find(MockComponent).prop(`fullTime`)).toEqual(734);
  });

  it(`MockComponent should has correctly props when user calls onCurrentTimeSet`, () => {
    const MockComponentWrapped = withPlayer(MockComponent);
    const wrapper = mount(<MockComponentWrapped />);

    wrapper.find(MockComponent).prop(`onCurrentTimeSet`)(337);
    wrapper.update();
    expect(wrapper.find(MockComponent).prop(`currentTime`)).toEqual(337);
  });

  it(`MockComponent should has correctly props (true) when user calls onToggleFullScreen`, () => {
    const MockComponentWrapped = withPlayer(MockComponent);
    const wrapper = mount(<MockComponentWrapped />);

    wrapper.find(MockComponent).prop(`onToggleFullScreen`)(true);
    wrapper.update();
    expect(wrapper.find(MockComponent).prop(`isFullScreen`)).toBeTruthy();
  });

  it(`MockComponent should has correctly props (false) when user calls onToggleFullScreen`, () => {
    const MockComponentWrapped = withPlayer(MockComponent);
    const wrapper = mount(<MockComponentWrapped />);

    wrapper.find(MockComponent).prop(`onToggleFullScreen`)(false);
    wrapper.update();
    expect(wrapper.find(MockComponent).prop(`isFullScreen`)).toBeFalsy();
  });
});
