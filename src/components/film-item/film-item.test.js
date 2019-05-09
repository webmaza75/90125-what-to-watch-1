import React from 'react';
import renderer from 'react-test-renderer';

import FilmItem from './film-item.jsx';

const mock = {
  title: `Aviator`,
  picture: `aviator.jpg`
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
