import React from 'react';
import renderer from 'react-test-renderer';

import FilmList from './film-list.jsx';

window.HTMLMediaElement.prototype.play = () => {};

const mock = {
  genre: [`Drama`],
  title: `Macbeth`,
  desc: `Macbeth, the Thane of Glamis, receives a prophecy from a trio of witches that one day he will become King of Scotland. Consumed by ambition and spurred to action by his wife, Macbeth murders his king and takes the throne for himself.`,
  picture: `macbeth.jpg`,
  year: 2015,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
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
