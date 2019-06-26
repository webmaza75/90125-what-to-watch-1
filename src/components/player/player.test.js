import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import Player from './player.jsx';
import film from '../../mocks/film.js';
import reducer from '../../reducers/reducer.js';

it(`Player correctly renders`, () => {
  const tree = renderer
    .create(<Provider store={createStore(reducer)}>
      <Player
        movie={film}
        onTogglePlayButton={jest.fn()}
        isPlaying={true}
        isFullScreen={false}
        currentTime={0}
        fullTime={0}
        onSetFullTime={jest.fn()}
        onSetCurrentTime={jest.fn()}
        onToggleFullScreen={jest.fn()}
        onTogglePlay={jest.fn()}
      />
    </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
