import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './footer.jsx';

it(`Footer correctly renders`, () => {
  const footer = renderer
    .create(<Footer />)
    .toJSON();

  expect(footer).toMatchSnapshot();
});
