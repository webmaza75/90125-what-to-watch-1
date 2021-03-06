import React from 'react';
import renderer from 'react-test-renderer';

import VideoPlayer from './video-player.jsx';
import film from '../../mocks/film.js';

window.HTMLMediaElement.prototype.play = () => {};

const {src, picture} = film;

it(`VideoPlayer correctly renders`, () => {
  const videoPlayer = renderer
    .create(<VideoPlayer
      src={src}
      isPlaying={true}
      poster={picture}
    />)
    .toJSON();

  expect(videoPlayer).toMatchSnapshot();
});
