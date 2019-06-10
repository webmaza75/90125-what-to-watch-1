import React from 'react';
import renderer from 'react-test-renderer';

import GlobalIcons from './global-icons.jsx';

it(`GlobalIcons correctly renders`, () => {
  const globalIcons = renderer
    .create(<GlobalIcons />)
    .toJSON();

  expect(globalIcons).toMatchSnapshot();
});
