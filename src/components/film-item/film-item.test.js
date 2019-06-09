import React from 'react';
import renderer from 'react-test-renderer';

import FilmItem from './film-item.jsx';

window.HTMLMediaElement.prototype.play = () => {};

const mock = {
  title: `Aviator`,
  picture: `aviator.jpg`,
  src: ``
};

describe(``, () => {
  it(`Film item correctly renders with isPlaying false`, () => {
    const tree = renderer
      .create(<FilmItem
        item={mock}
        onClick={jest.fn()}
        isPlaying={false}
        onMouseOver={jest.fn()}
        onMouseOut={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Film item correctly renders with isPlaying true`, () => {
    const tree = renderer
      .create(<FilmItem
        item={mock}
        onClick={jest.fn()}
        isPlaying={true}
        onMouseOver={jest.fn()}
        onMouseOut={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
