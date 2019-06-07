import React from 'react';
import renderer from 'react-test-renderer';

import PreHeader from './pre-header.jsx';

it(`PreHeader correctly renders`, () => {
  const preHeader = renderer
    .create(<PreHeader />)
    .toJSON();

  expect(preHeader).toMatchSnapshot();
});
