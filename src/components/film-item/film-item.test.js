import React from 'react';
import renderer from 'react-test-renderer';

import FilmItem from './film-item.jsx';

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

const mock = {
  title: `Aviator`,
  picture: `aviator.jpg`,
  src: ``
};

it(`Film item correctly renders`, () => {
  const tree = renderer
    .create(<FilmItem
      item={mock}
      onClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
