import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import filmList from '../../mock/filmList.js';

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
      filmList={filmList}
      onClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
