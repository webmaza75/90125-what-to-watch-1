import React from 'react';
import renderer from 'react-test-renderer';

import Logo from './logo.jsx';

it(`Logo correctly renders`, () => {
  const logo = renderer
    .create(<Logo />)
    .toJSON();
  expect(logo).toMatchSnapshot();
});

it(`Light Logo correctly renders (footer)`, () => {
  const logo = renderer
    .create(<Logo
      invert={true}
    />)
    .toJSON();
  expect(logo).toMatchSnapshot();
});

