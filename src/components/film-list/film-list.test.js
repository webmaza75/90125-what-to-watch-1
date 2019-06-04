import React from 'react';
import renderer from 'react-test-renderer';

import FilmList from './film-list.jsx';

window.HTMLMediaElement.prototype.play = () => {};

const mock = {
  genre: `Drama`,
  title: `Macbeth`,
  picture: `macbeth.jpg`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  id: 1
};

it(`Film list correctly renders`, () => {
  const tree = renderer
    .create(<FilmList
      films={[mock]}
      onChange={jest.fn()}
      activeItem={mock}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
