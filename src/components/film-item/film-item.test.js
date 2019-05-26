import React from 'react';
import renderer from 'react-test-renderer';

import FilmItem from './film-item.jsx';

window.HTMLMediaElement.prototype.play = () => {};

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
      onHover={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
