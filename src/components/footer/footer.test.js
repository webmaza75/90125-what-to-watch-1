import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import Footer from './footer.jsx';

it(`Footer correctly renders`, () => {
  const footer = renderer
    .create(<MemoryRouter initialEntries={[`/`]}>
      <Footer />
    </MemoryRouter>)
    .toJSON();

  expect(footer).toMatchSnapshot();
});
