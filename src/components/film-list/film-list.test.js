import React from 'react';
import renderer from 'react-test-renderer';

import FilmList from './film-list.jsx';

const mock = [{
  title: `Aviator`,
  picture: `aviator.jpg`
}];

it(`Film list correctly renders`, () => {
  const tree = renderer
    .create(<FilmList
      films={mock}
      onClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
