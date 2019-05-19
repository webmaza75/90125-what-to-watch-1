import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';
import films from '../../mocks/films.js';

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
      films={films}
      onClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
